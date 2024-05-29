"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const Jwt = __importStar(require("jsonwebtoken"));
const environment_1 = require("../environments/environment");
const Crypto = __importStar(require("crypto"));
const Redis_1 = require("./Redis");
class JWT {
    static JwtSign(payload, userId, expires_in = "1h") {
        // JWT.gen_secret_key();
        return Jwt.sign(payload, (0, environment_1.getEnvironmentVariables)().jwt_secret_key, {
            expiresIn: expires_in,
            audience: userId.toString(),
            issuer: process.env.DB_ISSUER,
        });
    }
    static jwtVerify(token) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, (0, environment_1.getEnvironmentVariables)().jwt_secret_key, (err, decoded) => {
                if (err)
                    reject(err);
                else if (!decoded)
                    reject(new Error("User is not authorized."));
                else
                    resolve(decoded);
            });
        });
    }
    static JwtSignRefreshToken(payload_1, userId_1) {
        return __awaiter(this, arguments, void 0, function* (payload, userId, expires_in = "1y", redis_ex = 365 * 24 * 60 * 60
        // redis_ex: number = 20
        ) {
            try {
                const refreshToken = Jwt.sign(payload, (0, environment_1.getEnvironmentVariables)().jwt_refresh_secret_key, {
                    expiresIn: expires_in,
                    audience: userId.toString(),
                    issuer: process.env.DB_ISSUER,
                });
                //set refreshToken in redis with key userId
                yield Redis_1.Redis.setValue(userId.toString(), refreshToken, redis_ex);
                return refreshToken;
            }
            catch (e) {
                //throw new Error(e);
                throw e;
            }
        });
    }
    static jwtVerifyRefreshToken(refreshToken) {
        return new Promise((resolve, reject) => {
            Jwt.verify(refreshToken, (0, environment_1.getEnvironmentVariables)().jwt_refresh_secret_key, (err, decoded) => {
                if (err)
                    reject(err);
                else if (!decoded)
                    reject(new Error("User is not authorized."));
                else {
                    //match refresh token from redis database
                    const user = decoded;
                    Redis_1.Redis.getValue(user.aud)
                        .then((value) => {
                        if (value === refreshToken)
                            resolve(decoded);
                        else
                            reject(new Error("Your session is expired! Please Login Again."));
                    })
                        .catch((e) => {
                        reject(e);
                    });
                }
            });
        });
    }
    static gen_secret_key() {
        const DEV_access_token_secret_key = Crypto.randomBytes(32).toString("hex");
        const DEV_refresh_token_secret_key = Crypto.randomBytes(32).toString("hex");
        const PROD_access_token_secret_key = Crypto.randomBytes(32).toString("hex");
        const PROD_refresh_token_secret_key = Crypto.randomBytes(32).toString("hex");
        console.table({
            DEV_access_token_secret_key,
            DEV_refresh_token_secret_key,
            PROD_access_token_secret_key,
            PROD_refresh_token_secret_key,
        });
    }
}
exports.JWT = JWT;
