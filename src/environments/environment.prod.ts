import { Utils } from "../utils/Utils";
import { Environment } from "./environment";

Utils.dotenvConfigs();

export const ProdEnvironment: Environment = {
  db_uri:`mongodb+srv://${process.env.PROD_DB_USER}:${process.env.PROD_DB_PASSWORD}@${process.env.PROD_DB_HOST}?retryWrites=true&w=majority`,
  jwt_secret_key: `${process.env.PROD_JWT_SECRET_KEY}`,
  jwt_refresh_secret_key: `${process.env.PROD_JWT_REFRESH_SECRET_KEY}`,
  host: `${process.env.PROD_HOST_MAILTRAP}`,
  port: 25,
  auth: {
    user: `${process.env.PROD_MAILTRAP_USER}`,
    pass: `${process.env.PROD_MAILTRAP_PASSWORD}`,
  },
  gmail_auth: {
    user: `${process.env.PROD_GMAIL_USER}`,
    pass: `${process.env.PROD_GMAIL_PASSWORD}`,
  },
  redis:{
    username: process.env.SERVER_REDIS_USERNAME,
    password: process.env.SERVER_REDIS_PASSWORD,
    host: process.env.SERVER_REDIS_HOST,
    port: parseInt(process.env.SERVER_REDIS_PORT)
  }

};
