/**
 * Module for storing the RedisClient class definition.
 * @module RedisClient
 */
import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * Encapsulates Redis client's methods and properties.
 */
class RedisClient {
  constructor() {
    /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     * Creates Redis client and initial class properties.
     */
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

    this.get = promisify(this.client.get).bind(this.client);
    this.psetex = promisify(this.client.psetex).bind(this.client);
    this.del = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     * Checks if the connection using the Redis client was succesful.
     */
    return this.connectionSuccesful;
  }

  async get(key) {
    /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     * Gets the value of the provided key from Redis.
     */
    return this.get(key);
  }

  async set(key, value, duration) {
    /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     * Sets the value and expiration time of the provided key in Redis.
     */
    return this.psetex(key, duration, value);
  }

  async del(key) {
    /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     * Deletes the value of the provided key in Redis.
     */
	return this.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
