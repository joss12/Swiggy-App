"use strict";
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
exports.GlobalMiddleWare = void 0;
const express_validator_1 = require("express-validator");
const Jwt_1 = require("./../utils/Jwt");
class GlobalMiddleWare {
    static checkError(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
        }
        else {
            next();
        }
    }
    static auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const header_auth = req.headers.authorization; //Bearer Token
            const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
            // const authHeader = header_auth.split(' ') const token1 = authHeader[1];
            try {
                if (!token) {
                    req.errorStatus = 401;
                    next(new Error("User does not exist"));
                }
                const decoded = yield Jwt_1.JWT.jwtVerify(token);
                req.user = decoded;
                next();
            }
            catch (e) {
                req.errorStatus = 401;
                next(new Error("User does not exist"));
            }
        });
    }
    static decodedRefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.body.refreshToken;
            try {
                if (!refreshToken) {
                    req.errorStatus = 403;
                    next(new Error("Access is forbidden! User does not exist"));
                }
                const decoded = yield Jwt_1.JWT.jwtVerifyRefreshToken(refreshToken);
                req.user = decoded;
                next();
            }
            catch (e) {
                req.errorStatus = 403;
                next(new Error("Your session is expired or you are invalid User! Please login again."));
            }
        });
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
exports.GlobalMiddleWare = GlobalMiddleWare;
