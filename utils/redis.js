/**
 * Module for storing the RedisClient class definition.
 * @module RedisClient
 */
import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  // Creates Redis client and initial class properties. ━━━━━━━━━━━━━━━━━━━━━━━
  constructor() {
    (async () => {
      // Create redis client object.
      this.client = createClient()
        .on('error', (err) => {
          this.connectionSuccesful = false;
          console.log('Redis Client Error: ', err);
        });
      // Set connectionSuccessful to true.
      this.connectionSuccesful = true;
    })();

    // Create async methods bounded to client using promisify.
    this.get = promisify(this.client.get).bind(this.client);
    this.psetex = promisify(this.client.psetex).bind(this.client);
    this.del = promisify(this.client.del).bind(this.client);
  }

  // Checks if the connection using the Redis client was succesful. ━━━━━━━━━━━
  isAlive() {
    return this.connectionSuccesful;
  }

  // Gets the value of the provided key from Redis. ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async get(key) {
    return this.get(key);
  }

  // Sets the value and expiration time of the provided key in Redis. ━━━━━━━━━
  async set(key, value, duration) {
    return this.psetex(key, duration, value);
  }

  // Deletes the value of the provided key in Redis. ━━━━━━━━━━━━━━━━━━━━━━━━━━
  async del(key) {
    return this.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
