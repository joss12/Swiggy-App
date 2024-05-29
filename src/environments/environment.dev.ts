import { Utils } from "../utils/Utils";
import { Environment } from "./environment";

Utils.dotenvConfigs();

export const DevEnvironment: Environment = {
  db_uri:
    `mongodb+srv://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASSWORD}@${process.env.DEV_DB_HOST}?retryWrites=true&w=majority`,
  jwt_secret_key: `${process.env.DEV_JWT_SECRET_KEY}`,
  jwt_refresh_secret_key: `${process.env.DEV_JWT_REFRESH_SECRET_KEY}`,
  host: `${process.env.DEV_HOST_MAILTRAP}`,
  port: 25,
  auth: {
    user: `${process.env.DEV_MAILTRAP_USER}`,
    pass: `${process.env.DEV_MAILTRAP_PASSWORD}`,
  },
  gmail_auth: {
    user: `${process.env.DEV_GMAIL_USER}`,
    pass: `${process.env.DEV_GMAIL_PASSWORD}`,
  },
  redis:{
    username: null,
    password: null,
    host: process.env.LOCAL_REDIS_HOST,
    port: parseInt(process.env.LOCAL_REDIS_PORT)
  }

};
