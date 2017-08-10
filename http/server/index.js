'use strict';
//
// requiere modules externals
const express = require('express'),
  server = express(),
  requestId = require('express-request-id')(),
  bodyParser = require('body-parser'),
  compression = require('compression'),
  helmet = require('helmet'),
  http = require('http');

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
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key, x-access-token');
  
  if ('OPTIONS' == req.method) 
    res.send(200);
  else 
    next();
});

// listener
server.set('port', process.env.PORT || 3000);
http.createServer(server).listen(server.get('port'), '0.0.0.0', function () {
  console.log('Express server listening on port ' + server.get('port'));
});

module.exports = server;