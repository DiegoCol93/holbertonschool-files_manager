/**
 * Module for storing the RedisClient class definition.
 * @module RedisClient
 */
import { createClient } from 'redis';
import { promisify } from 'util';


/**
 * Encapsulates redis client's methods and properties.
 */
class RedisClient {
  constructor(){
	/** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	 * Creates redis client and initial class properties.
	 */
	(async () => {
	  // Create redis client object.
	  this.client = createClient()
		.on('error', err => {
		  this.connectionSuccesful = false;
		  console.log('Redis Client Error: ', err);
	  });
	  // Set connectionSuccessful to true.
	  this.connectionSuccesful = true;
	})();
	// Create get async method bound to client.
	this.get = promisify(this.client.get).bind(this.client);
	// Create psetex async method bound to client.
	this.psetex = promisify(this.client.psetex).bind(this.client);
  }

  isAlive() {
	/** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	 * Checks if the connection with the redis client was succesful.
	 */
	return this.connectionSuccesful;
  }

  async get(key){
	/** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	 * Gets the value of the provided key.
	 */
	return await this.get(key);
  }

  async set(key, value, duration) {
	/** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	 * Sets the value and expiration time of the provided key.
	 */
	return await this.psetex(key, duration, value);
  }
}

const redisClient = new RedisClient;
export default redisClient;
