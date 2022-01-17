import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const redis = redisClient;
const mongo = dbClient;

export function getStatus() {
  return { redis: redis.isAlive(), db: mongo.isAlive() };
}

export function getStats() {
  return {
    users: mongo.nbUsers(),
    files: mongo.nbFiles(),
  };
}
