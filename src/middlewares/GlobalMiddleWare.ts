import { validationResult } from "express-validator";
import { JWT } from "./../utils/Jwt";

export class GlobalMiddleWare {
  static checkError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    } else {
      next();
    }
  }

  static async auth(req, res, next) {
    const header_auth = req.headers.authorization; //Bearer Token
    const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
    // const authHeader = header_auth.split(' ') const token1 = authHeader[1];
    try {
      if (!token) {
        req.errorStatus = 401;
        next(new Error("User does not exist"));
      }
      const decoded = await JWT.jwtVerify(token);
      req.user = decoded;

      next();
    } catch (e) {
      req.errorStatus = 401;
      next(new Error("User does not exist"));
    }
  }


  static async decodedRefreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;
    try {
      if (!refreshToken) {
        req.errorStatus = 403;
            next(new Error("Access is forbidden! User does not exist"));
      }
      const decoded = await JWT.jwtVerifyRefreshToken(refreshToken);
      req.user = decoded;

      next();
    } catch (e) {
      req.errorStatus = 403;
      next(new Error("Your session is expired or you are invalid User! Please login again."));
    }
  }

  static adminRole(req, res, next) {
    const user = req.user;
    // console.log(user);
    if (user.type !== "admin") {
      // req.errorStatus = 401;
      next(new Error("You are an Unauthorized User"));
    }
    next();
  }
}
