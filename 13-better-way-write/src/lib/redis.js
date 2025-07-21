import { createClient } from 'redis';

const redisUrl = process.env.REDID_URL || 'redis://localhost:6379';
const redisToken = process.env.REDIS_TOKEN || null;

const redisOption = { url: redisUrl };

if (redisToken) {
    redisOption.password = redisToken;
}

const redis = createClient(redisOption);

redis.on('connect', () => console.log('Redis connected 🚀'));
redis.on('disconnect', () => console.log('Redis Disconnected'));

async function initRedis() {
    await redis.connect();
}

export { redis, initRedis }