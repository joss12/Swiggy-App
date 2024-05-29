export declare class JWT {
    static JwtSign(payload: any, userId: any, expires_in?: string): string;
    static jwtVerify(token: string): Promise<any>;
    static JwtSignRefreshToken(payload: any, userId: any, expires_in?: string, redis_ex?: number): Promise<string>;
    static jwtVerifyRefreshToken(refreshToken: string): Promise<any>;
    private static gen_secret_key;
}
