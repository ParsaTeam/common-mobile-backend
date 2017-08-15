'use strict';
//
// requiere modules externals
const winston = require('winston'),
  WinstonCloudWatch = require('winston-cloudwatch');

//
// transports default
winston.transports.CloudWatchServerInternalError = WinstonCloudWatch;
winston.loggers.add('CloudWatchServerInternalError', {
  CloudWatchServerInternalError: {
    logGroupName: `mobile-backend/${process.env.SERVICE_NAME}`,
    logStreamName: 'internal-error-server',
    awsAccessKeyId: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY,
    awsRegion: process.env.CLOUDWACTH_AWS_REGION,
    awsOptions: {
      logStreamName: process.env.CLOUDWACTH_AWS_REGION
    }
  }
});

//
// log methods to expose
const log = {
  info(message, category) {
    category = category || categories.unknown;
    winston.loggers.get(category).info(message);
  },
  warn(message, category) {
    category = category || categories.unknown;
    winston.loggers.get(category).warn(message);
  },
  error(message, category) {
    category = category || categories.unknown;
    winston.loggers.get(category).error(message);
  },
  warnCustonError(err, requestId) {
    const messageToLog = {
      message: err.message,
      stack: err.stack,
      requestId
    };
    winston.loggers.get(err.category).warn(messageToLog);
  },
  errorCustonError(err, requestId) {
    const messageToLog = {
      status: err.status,
      message: err.message,
      stack: err.stack,
      requestId
    };
    winston.loggers.get(err.category).error(JSON.stringify(messageToLog));
  }
}

//
// categories props to expose
const categories = {
  internalError: 'CloudWatchServerInternalError'
}

//
// grouped modules to export
module.exports = {
  log,
  categories,
  extends: {
    winston,
    WinstonCloudWatch
  }
};