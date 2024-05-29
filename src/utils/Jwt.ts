import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/environment";
import * as Crypto from "crypto";
import { Redis } from "./Redis";

export class JWT {
  static JwtSign(payload, userId, expires_in: string = "1h") {
    // JWT.gen_secret_key();
    return Jwt.sign(payload, getEnvironmentVariables().jwt_secret_key, {
      expiresIn: expires_in,
      audience: userId.toString(),
      issuer: process.env.DB_ISSUER,
    });
  }

  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Jwt.verify(
        token,
        getEnvironmentVariables().jwt_secret_key,
        (err, decoded) => {
          if (err) reject(err);
          else if (!decoded) reject(new Error("User is not authorized."));
          else resolve(decoded);
        }
      );
    });
  }

  static async JwtSignRefreshToken(
    payload,
    userId,
    expires_in: string = "1y",
    redis_ex: number = 365 * 24 * 60 * 60
    // redis_ex: number = 20
  ) {
    try {
      const refreshToken = Jwt.sign(
        payload,
        getEnvironmentVariables().jwt_refresh_secret_key,
        {
          expiresIn: expires_in,
          audience: userId.toString(),
          issuer: process.env.DB_ISSUER,
        }
      );
      //set refreshToken in redis with key userId
      await Redis.setValue(userId.toString(), refreshToken, redis_ex);
      return refreshToken;
    } catch (e) {
      //throw new Error(e);
      throw e;
    }
  }

  static jwtVerifyRefreshToken(refreshToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Jwt.verify(
        refreshToken,
        getEnvironmentVariables().jwt_refresh_secret_key,
        (err, decoded) => {
          if (err) reject(err);
          else if (!decoded) reject(new Error("User is not authorized."));
          else {
            //match refresh token from redis database
            const user: any = decoded;
            Redis.getValue(user.aud)
              .then((value) => {
                if (value === refreshToken) resolve(decoded);
                else reject(new Error("Your session is expired! Please Login Again."));
              })
              .catch((e) => {
                reject(e);
              });
          }
        }
      );
    });
  }

  private static gen_secret_key() {
    const DEV_access_token_secret_key = Crypto.randomBytes(32).toString("hex");
    const DEV_refresh_token_secret_key = Crypto.randomBytes(32).toString("hex");

    const PROD_access_token_secret_key = Crypto.randomBytes(32).toString("hex");
    const PROD_refresh_token_secret_key =
      Crypto.randomBytes(32).toString("hex");

    console.table({
      DEV_access_token_secret_key,
      DEV_refresh_token_secret_key,
      PROD_access_token_secret_key,
      PROD_refresh_token_secret_key,
    });
  }
}
