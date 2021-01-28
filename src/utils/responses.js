function errorResponse(res, statusCode, message = 'An error occurred', data = null, status = 'error') {
  const responseObject = {
    status,
    data,
    message,
  };
  return res.status(statusCode).send(responseObject);
}

function successResponse(res, statusCode, message, data = {}, status = 'success') {
  const responseObject = {
    status,
    data,
    message,
  };
  return res.status(statusCode).send(responseObject);
}

module.exports = {
  errorResponse,
  successResponse,
};
