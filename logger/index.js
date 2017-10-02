'use strict';

//
// requiere modules externals
const winston = require('winston');
const crypto = require('crypto');
const WinstonCloudWatch = require('winston-cloudwatch');

//
// Give ourselves a randomized (time-based) hash to append to our stream name
// so multiple instances of the server running don't log to the same
// date-separated stream.
const startTime = new Date().toISOString();

winston.add(WinstonCloudWatch, {
  logGroupName: `mobile-backend/${process.env.SERVICE_NAME}`,
  logStreamName: () => {
    // Spread log streams across dates as the server stays up
    const date = new Date().toISOString().split('T')[0];
    const cryptoMD5 = crypto.createHash('md5')
      .update(startTime)
      .digest('hex');
    return `${date}-${cryptoMD5}`;
  },
  awsAccessKeyId: process.env.USER_CLOUDWACTH_ACCESS,
  awsSecretKey: process.env.USER_CLOUDWACTH_SECRET,
  awsRegion: process.env.USER_CLOUDWACTH_AWS_REGION,
  awsOptions: {
    logStreamName: process.env.USER_CLOUDWACTH_AWS_REGION
  }
});

//
// log methods to expose
const log = {
  info(message) {
    winston.info(message);
  },
  infoWithMetadata(message, metadata) {
    metadata.level = 'info';
    winston.info(message, JSON.stringify(metadata));
  },
  warn(message) {
    winston.warn(message);
  },
  warnWithMetadata(message, metadata) {
    metadata.level = 'warn';
    winston.warn(message, JSON.stringify(metadata));
  },
  error(err) {
    const message = err.message;
    delete err.message;
    winston.error(message, err);
  },
  errorWithMetadata(err, metadata) {
    metadata.level = 'error';
    metadata.stack = err.stack;
    winston.error(err.message, JSON.stringify(metadata));
  }
};

//
// grouped modules to export
module.exports = {
  log
};