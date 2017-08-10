'use strict';
const CACHE_TIME_IN_MINUTES = 60;

const cacheControl = {
  cache(cacheTimeInMinutes) {
    return (req, res, next) => {
      let seconds = (cacheTimeInMinutes || CACHE_TIME_IN_MINUTES) * 60;
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

module.exports = cacheControl;