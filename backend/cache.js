const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const getOrSetCache = (key, cb) => {
  return new Promise((resolve, reject) => {
    client.get(key, async (err, data) => {
      if (err) return reject(err);
      if (data != null) return resolve(JSON.parse(data));
      const freshData = await cb();
      client.setex(key, 3600, JSON.stringify(freshData)); // Cache for 1 hour
      resolve(freshData);
    });
  });
};

module.exports = getOrSetCache;
