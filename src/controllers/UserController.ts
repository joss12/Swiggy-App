// import { getEnvironmentVariables } from "../environments/environment";
import User from "../models/User";
import { JWT } from "./../utils/Jwt";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";
import { Redis } from "../utils/Redis";

export class UserController {
  //Signup
  static async signup(req, res, next) {
    const { email, password, name, type, status, phone } = req.body;
    const verification_token = Utils.generateVerificationToken();
    try {
      const hash = await Utils.encryptPassword(password);
      const data = {
        email,
        verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        phone,
        password: hash,
        name,
        type,
        status,
      };

      const user = await new User(data).save();
      const user_data = {
        email: user.email,
        email_verified: user.email_verified,
        phone:user.phone,
        name: user.name,
        photo: user.photo || null,
        type: user.type,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at
      }

      //payload
      const payload = {
        // user_id: user._id,
        // aud: user._id,
        email: user.email,
        type: user.type,
      };
      //flter user data to pass in frontend
      const access_token = JWT.JwtSign(payload, user._id);
      const refresh_token = await JWT.JwtSignRefreshToken(payload, user._id);
      res.json({
        token: access_token,
        refreshToken: refresh_token,
        user: user_data,
      });

      //send email to user for verification
      await NodeMailer.sendMail({
        to: [user.email],
        subject: "Email Verification",
        html: `<h1>Your Otp is ${verification_token}</h1>`,
      });
    } catch (error) {
      next(error);
    }
  }

  //Verify Email
  static async verifyUserEmailToken(req, res, next) {
    const { verification_token } = req.body;
    const email = req.user.email;
    try {
      const user = await User.findOneAndUpdate(
        {
          email,
          verification_token: verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        {
          email_verified: true,
          updated_at: new Date(),
        },
        {
          new: true,
          projection:{
            verification_token:0,
            verification_token_time:0,
            password: 0,
            reset_password_token: 0,
            reset_password_token_time: 0,
            __v:0,
            _id:0
          }
        }
      );
      if (user) {
        res.send(user);
      } else {
        throw new Error(
          "Wrong OTP or Email Verification Token is Expired. Please try again..."
        );
      }
    } catch (error) {
      next(error);
    }
  }

  //Resend Verification Email
  static async resendVerificationEmail(req, res, next) {
    const email = req.user.email;
    const verification_token = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        { email },
        {
          updated_at: new Date(),
          verification_token: verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        }
      );
      if (user) {
        await NodeMailer.sendMail({
          to: [user.email],
          subject: "Resend Email Verification",
          html: `<h1>Your Otp is ${verification_token}</h1>`,
        });
        res.json({ success: true });
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (e) {
      next(e);
    }
  }

  //Login
  static async login(req, res, next) {
    const user = req.user;
    const password = req.query.password;
    const data = {
      password,
      encrypt_password: user.password,
    };
    try {
      await Utils.comparePassword(data);
      const payload = {
        // user_id: user._id,
        // aud:user._id,
        email: user.email,
        type: user.type,
      };
      const access_token = JWT.JwtSign(payload, user._id);
      const refresh_token = await JWT.JwtSignRefreshToken(payload, user._id);
      const user_data = {
        email: user.email,
        email_verified: user.email_verified,
        phone:user.phone,
        name: user.name,
        photo: user.photo || null,
        type: user.type,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
      res.json({
        token: access_token,
        refreshToken: refresh_token,
        user: user_data,
      });
    } catch (e) {
      next(e);
    }
  }

  //Send Reset Password Otp
  static async sendResetPasswordOtp(req, res, next) {
    const email = req.query.email;
    const reset_password_token = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        { email },
        {
          updated_at: new Date(),
          reset_password_token: reset_password_token,
          reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        }
      );
      if (user) {
        res.json({ success: true });
        await NodeMailer.sendMail({
          to: [user.email],
          subject: "Reset password email verification otp",
          html: `<h1>Your Otp is ${reset_password_token}</h1>`,
        });
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (e) {
      next(e);
    }
  }

  //Verify Reset Password Token
  static verifyResetPasswordToken(req, res, next) {
    res.json({ success: true });
  }

  //Reset Password
  static async resetPassword(req, res, next) {
    // const reset_password_token = Utils.generateVerificationToken();
    const user = req.user;
    const new_password = req.body.new_password;
    try {
      const encryptedPassword = await Utils.encryptPassword(new_password);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          updated_at: new Date(),
          password: encryptedPassword,
        },
        { new: true, 
          projection:{
            verification_token:0,
            verification_token_time:0,
            password: 0,
            reset_password_token: 0,
            reset_password_token_time: 0,
            __v:0,
            _id:0
        } }
      );
      if (updatedUser) {
        res.send(updatedUser);
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (e) {
      next(e);
    }
  }

  //Profile
  static async profile(req, res, next) {
    const user = req.user;
    try {
      const profile = await User.findById(user.aud);
      if (profile) {
        const user_data = {
          email: profile.email,
          email_verified: profile.email_verified,
          phone:profile.phone,
          name: profile.name,
          photo: profile.photo || null,
          type: profile.type,
          status: profile.status,
          created_at: profile.created_at,
          updated_at: profile.updated_at
        }
        // res.send(profile);
        res.send(user_data);
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (e) {
      next(e);
    }
  }

  //UpdatePhoneNumber
  static async updatePhoneNumber(req, res, next) {
    const user = req.user;
    const phone = req.body.phone;
    try {
      const userData = await User.findByIdAndUpdate(
        user.aud,
        { phone: phone, updated_at: new Date() },
        { new: true, 
          projection:{
            verification_token:0,
            verification_token_time:0,
            password: 0,
            reset_password_token: 0,
            reset_password_token_time: 0,
            __v:0,
            _id:0
        } }
      );
      res.send(userData);
    } catch (e) {
      next(e);
    }
  }
  //updateUserProfile
  static async updateUserProfile(req, res, next) {
    const user = req.user;
    const { new_email, phone, plain_password } = req.body;
    const verification_token = Utils.generateVerificationToken();

    try {
      const userData = await User.findById(user.aud);
      if (!userData) throw new Error("User does not exist");
      await Utils.comparePassword({
        password: plain_password,
        encrypt_password: userData.password,
      });
      const updatedUser = await User.findByIdAndUpdate(
        user.aud,
        {
          phone: phone,
          email: new_email,
          email_verified: false,
          verification_token: Date.now() + new Utils().MAX_TOKEN_TIME,
          updated_at: new Date(),
        },
        { new: true, 
          projection:{
            verification_token:0,
            verification_token_time:0,
            password: 0,
            reset_password_token: 0,
            reset_password_token_time: 0,
            __v:0,
            _id:0
        } }
      );
      const payload = {
        // aud: user.aud,
        email: updatedUser.email,
        type: updatedUser.type,
      };
      const access_token = JWT.JwtSign(payload, user.aud);
      const refresh_token = JWT.JwtSign(payload, user.aud);
      res.json({
        token: access_token,
        refresh_token: refresh_token,
        updatedUser,
      });
      //send email to user for verification
      await NodeMailer.sendMail({
        to: [updatedUser.email],
        subject: "Email Verification",
        html: `<h1>Your Otp is ${verification_token}</h1>`,
      });
      res.send(userData);
    } catch (e) {
      next(e);
    }
  }
  // getNewTokens

  static async getNewTokens(req, res, next) {
    // const refreshToken = req.body.refreshToken;
    // const decoded_data = await JWT.jwtVerifyRefreshToken(refreshToken);
    const decoded_data = req.user;
    try {
      if (decoded_data) {
        const payload = {
          // user_id: decoded_data.aud,
          email: decoded_data.email,
          type: decoded_data.type,
        };
        const access_token = JWT.JwtSign(payload, decoded_data.aud);
        const refresh_token = await JWT.JwtSignRefreshToken(
          payload,
          decoded_data.aud
        );
        res.json({
          accessToken: access_token,
          refreshToken: refresh_token,
        });
      } else {
        req.errorStatus = 403;
        // throw new Error('Access is forbidden');
        throw "Access is forbidden";
      }
    } catch (e) {
      req.errorStatus = 403;
      next(e);
    }
  }


  static async logout(req, res, next) {
    // const refreshToken = req.body.refreshToken;
    // const decoded_data = await JWT.jwtVerifyRefreshToken(refreshToken);
    const decoded_data = req.user;
    try {
      if (decoded_data) {
        //delete refresh token from redis database
        await Redis.deleteKey(decoded_data.aud);
        res.json({
          success:true
        });
      } else {
        req.errorStatus = 403;
        // throw new Error('Access is forbidden');
        throw "Access is forbidden";
      }
    } catch (e) {
      req.errorStatus = 403;
      next(e);
    }
  }


  static async updateUserProfilePic(req, res, next){
    const path = req.file.path;
    const user = req.user;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        user.aud,
        {
         photo: path,
         updated_at: new Date()
        },
        { new: true, 
          projection:{
            verification_token:0,
            verification_token_time:0,
            password: 0,
            reset_password_token: 0,
            reset_password_token_time: 0,
            __v:0,
            _id:0
        } }
      );
      res.send(updatedUser)
      
    } catch (e) {
      next(e)
    }

  }

}
