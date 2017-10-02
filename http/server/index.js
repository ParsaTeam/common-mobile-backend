'use strict';

//
// requiere modules externals
const express = require('express');
const requestId = require('express-request-id')();
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const http = require('http');

const server = express();

// req.id
server.use(requestId);

// for parsing application/json
server.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

// compression
server.use(compression());

// helmet
server.use(helmet());

// cors
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key, x-access-token');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

//
// exposed server
module.exports = {
  createServerListen() {
    server.set('port', process.env.PORT || 3000);
    http.createServer(server).listen(server.get('port'), '0.0.0.0', () => {
      /* eslint-disable no-console */
      console.log(`Express server listening on port ${server.get('port')}`);
      /* eslint-enable no-console */
    });
  },

  getInstance() {
    return server;
  }
};