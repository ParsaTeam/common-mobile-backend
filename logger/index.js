'use strict';
//
// requiere modules externals
const winston = require('winston'),
  crypto = require('crypto'),
  WinstonCloudWatch = require('winston-cloudwatch');

//
// Give ourselves a randomized (time-based) hash to append to our stream name
// so multiple instances of the server running don't log to the same
// date-separated stream.
const startTime = new Date().toISOString();

const LOG_ID = 'cloudwatch-api';
winston.loggers.add(LOG_ID, {
  transports: [
    new WinstonCloudWatch({
      logGroupName: `mobile-backend/${process.env.SERVICE_NAME}`,
      logStreamName: function () {
        // Spread log streams across dates as the server stays up
        let date = new Date().toISOString().split('T')[0];
        return date + '-' + crypto.createHash('md5')
            .update(startTime)
            .digest('hex');
      },
      awsAccessKeyId: process.env.AWS_ACCESS_KEY,
      awsSecretKey: process.env.AWS_SECRET_KEY,
      awsRegion: process.env.CLOUDWACTH_AWS_REGION,
      awsOptions: {
        logStreamName: process.env.CLOUDWACTH_AWS_REGION
      }
    })
  ]
});

//
// log methods to expose
const log = {
  info(message, category) {
    const messageToLog = `${category} - ${message}`;
    winston.loggers.get(LOG_ID).info(messageToLog);
  },
  warn(message, category) {
    const messageToLog = `${category} - ${message}`;
    winston.loggers.get(LOG_ID).warn(messageToLog);
  },
  error(err, category, requestId) {
    const messageToLog = {
      category: category,
      message: err.message,
      stack: err.stack,
      requestId
    };

    const message = `${err.category} - ${err.message}`
    winston.loggers.get(LOG_ID).error(message, messageToLog);
  },
  warnCustonError(err, requestId) {
    const messageToLog = {
      category: err.category,
      status: err.status,
      message: err.message,
      stack: err.orinalStack,
      requestId
    };

    const message = `${err.category} - ${err.message}`
    winston.loggers.get(LOG_ID).warn(message, messageToLog);
  },
  errorCustonError(err, requestId) {
    const messageToLog = {
      category: err.category,
      status: err.status,
      message: err.message,
      stack: err.orinalStack,
      requestId
    };

    const message = `${err.category} - ${err.message}`
    winston.loggers.get(LOG_ID).error(message, messageToLog);
  }
}

//
// grouped modules to export
module.exports = {
  log
};