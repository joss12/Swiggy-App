import { createClient } from "redis";
import { getEnvironmentVariables } from "../environments/environment";

export const client = createClient({
  // url:'redis://' + getEnvironmentVariables().redis.host + ':' + getEnvironmentVariables().redis.port,
  username: getEnvironmentVariables().redis.username,
  password: getEnvironmentVariables().redis.password,
  socket: {
    host: getEnvironmentVariables().redis.host,
    port: getEnvironmentVariables().redis.port,
  },
});

export class Redis {
  static connectToRedis() {
    // this.client.on('error', (err)=>console.log('Redis Client Error', err));
    client
      .connect()
      .then(() => {
        console.log("Connected to redis");
      })
      .catch((e) => {
        throw e;
      });
  }

  static async setValue(key, value, expires_at?) {
    try {
      let options: any = {};
      if (expires_at) {
        options = {
          EX: expires_at,
        };
      }
      await client.set(key, value, options);
      return;
    } catch (e) {
      console.log(e);
      // throw('"Your session is expired! Please Login Again."');
      throw "Server not connected! Please try again...";
    }
  }

  static async getValue(key) {
    try {
      const value = await client.get(key);
      return value;
    } catch (e) {
      throw "Your session is expired! Please Login Again.";
    }
  }

  static async deleteKey(key: string) {
    try {
      await client.del(key);
      return;
    } catch (e) {
      throw "Server not connected! Please try again...";
    }
  }
}
