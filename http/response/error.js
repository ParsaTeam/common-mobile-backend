'use strict';
//
// exposed methods
const errorResponse = {
  send(res, statusCode, bodyResponse) {
    res.header('Cache-Control', 'private, max-age=0, no-cache, no-store, must-revalidate');
    res.json(statusCode, bodyResponse);
  }
};

module.exports = errorResponse;