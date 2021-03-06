'use stric';

//
// modules external
const redis = require('redis');
const Promise = require('bluebird');

//
// private
let client;
const _init = () => {
  client = redis.createClient({ host: process.env.REDIS_CACHE_HOST, port: process.env.REDIS_CACHE_PORT });
  client.on('error', (err) => {
    /* eslint-disable no-console */
    // TODO: use logger
    console.log('redis =====>', err.message);
    /* eslint-enable no-console */
  });
};

//
// exposed
const redisClient = {
  init() {
    _init();
  },

  setObject(key, value, expireInSecunds) {
    if (client === undefined) {
      _init();
    }

    if (client.connected) {
      client.setex(key, expireInSecunds, JSON.stringify(value));
    }
  },

  getObject(key) {
    if (client === undefined) {
      _init();
    }

    return new Promise((resolve) => {
      if (client.connected) {
        return client.get(key, (err, data) => {
          if (err) {
            return resolve(null);
          }

          return resolve(JSON.parse(data));
        });
      }

      return resolve(null);
    });
  },

  getObjects(keys) {
    if (client === undefined) {
      _init();
    }
    const resultEmptyData = keys.map(() => null);
    return new Promise((resolve) => {
      if (client.connected) {
        return client.mget(keys, (err, data) => {
          if (err) {
            return resolve(resultEmptyData);
          }

          const resultaData = data.map(item => JSON.parse(item));
          return resolve(resultaData);
        });
      }

      return resolve(resultEmptyData);
    });
  }
};

module.exports = redisClient;