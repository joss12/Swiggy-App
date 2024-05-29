export interface Environment {
    db_uri: string;
    jwt_secret_key: string;
    jwt_refresh_secret_key: string;
    host?: string;
    port?: number;
    auth?: {
        user: string;
        pass: string;
    };
    gmail_auth?: {
        user: string;
        pass: string;
    };
    redis?: {
        username?: string;
        password?: string;
        host: string;
        port: number;
    };
}
export declare function getEnvironmentVariables(): Environment;
