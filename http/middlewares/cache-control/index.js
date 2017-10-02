'use strict';

//
// const default values
const CACHE_TIME_IN_MINUTES = 60;

//
// exposed
const cacheControlMiddlewar = {
  cache(cacheTimeInMinutes) {
    return (req, res, next) => {
      const seconds = (cacheTimeInMinutes || CACHE_TIME_IN_MINUTES) * 60;
      res.header('Cache-Control', `public, max-age=${seconds}`);
      next();
    };
  },

  noCache() {
    return (req, res, next) => {
      res.header('Cache-Control', 'private, max-age=0, no-cache, no-store, must-revalidate');
      next();
    };
  }
};

module.exports = cacheControlMiddlewar;