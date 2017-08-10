'use strict';
// 
// private methods
const bodyResponseData = (data, requestId) => {
  return {
    data,
    requestId
  };
};

const bodyResponseError = (code, message, requestId, mobileBackendId) => {
  mobileBackendId = mobileBackendId ? `-${mobileBackendId}` : '';
  return {
    error: {
      message: message,
      code: `mb-${code}${mobileBackendId}`
    },
    requestId
  };
};

//
// exposed methods
const bodyResponse = {
  // 200
  ok(data, requestId) {
    return bodyResponseData(data, requestId);
  },

  // 400
  badRequest(message, requestId, mobileBackendId) {
    return bodyResponseError(400, message, requestId, mobileBackendId);
  },

  // 401
  unauthorized(message, requestId, mobileBackendId) {
    const messageUnauthorized = message || `The request has not been fullfilled because it lacks valid 
      authentication credentials (x-api-key) for the target resource.`;
    return bodyResponseError(401, messageUnauthorized, requestId, mobileBackendId);
  },

  // 404
  notFound(resource, requestId, mobileBackendId) {
    return bodyResponseError(404, `The resource ${resource} not found.`, requestId, mobileBackendId);
  },

  // 403
  forbidden(message, requestId, mobileBackendId) {
    return bodyResponseError(403, message, requestId, mobileBackendId);
  },

  // 404
  invalidMethod(message, requestId, mobileBackendId) {
    return bodyResponseError(404, message, requestId, mobileBackendId);
  },

  // 500
  internalServerError(err, requestId) {
    console.log(err.stack);
    return bodyResponseError(500, err.message, requestId);
  }
};

module.exports = bodyResponse;