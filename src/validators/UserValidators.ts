import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidators {
  static signup() {
    return [
      body("name", "Name is required").isString(),
      body("phone", "Phone number is required").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email })
            .then((user) => {
              if (user) {
                //   throw new Error("User already Exists");
                throw "User already Exists";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 255 })
        .withMessage("Password must be between 8-255 characters"),
      body("type", "User role type is required").isString(),
      body("status", "User status is required").isString(),
    ];
  }

  static verifyUserEmailToken() {
    return [
      body(
        "verification_token",
        "Email verification token is required"
      ).isNumeric(),
    ];
  }

  static login() {
    return [
      query("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email })
            .then((user) => {
              if (user) {
                if(user.type === 'user' || user.type === 'admin'){
                  req.user = user;
                  return true;
                }else{
                  throw "You are not an authorized user";
                }
              } else {
                throw "Email does not exists";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      query("password", "Password is required").isAlphanumeric(),
    ];
  }

  static checkResetPasswordEmail() {
    return [
      query("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email })
            .then((user) => {
              if (user) {
                return true;
              } else {
                throw "Email does not exists";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static verifyResetPasswordToken() {
    return [
      query("email", "Email is required").isEmail(),
      query("reset_password_token", "Reset password token is required")
        .isNumeric()
        .custom((reset_password_token, { req }) => {
          return User.findOne({
            email: req.query.email,
            reset_password_token,
            reset_password_token_time: { $gt: Date.now() },
          })
            .then((user) => {
              if (user) {
                return true;
              } else {
                throw "Reset password token does not exists. Please try again regenerate a new token";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static resetPassword() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email })
            .then((user) => {
              if (user) {
                req.user = user;
                return true;
              } else {
                throw "User does not exists";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("new_password", "New Password is required").isAlphanumeric(),
      body("otp", "Reset password is required")
        .isNumeric()
        .custom((reset_password_token, { req }) => {
          if (req.user.reset_password_token == reset_password_token) {
            return true;
          } else {
            req.errorStatus = 422;
            throw "Reset password token is invalid, please try again";
          }
        }),
    ];
  }

  //verify number
  static verifyPhoneNumber() {
    return [body("phone", "Phone number is required").isString()];
  }

  static verifyUserProfile() {
    return [
      body("phone", "Phone number is required").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email })
            .then((user) => {
              if (user) {
                throw "A user with entered email already exists, please provide a unique email id";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("password", "Password is required").isAlphanumeric(),
    ];
  }

  // static checkRefreshToken() {
  //   return [
  //     body("refreshToken", "Refresh token is required")
  //       .isString()
  //       .custom((refreshToken, { req }) => {
  //         if (refreshToken) {
  //           return true;
  //         } else {
  //           req.errorStatus = 403;
  //           // throw new Error('Access is forbidden');
  //           throw "Access is forbidden";
  //         }
  //       }),
  //   ];
  // }

  static userProfilePic() {
    return [
        body('profileImages', 'Profile image is required')
        .custom((profileImage, {req}) => {
            if(req.file) {
                return true;
            } else {
                // throw new Error('File not uploaded');
                throw('File not uploaded');
            }
        })
    ];
}

  
}


