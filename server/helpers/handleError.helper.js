const Response = require('./response.helper');

function handleError(err, req, res, next) {
  Response.error(res, {
    type: err.name,
    message: err.message,
  });
}

module.exports = handleError;
