/**
 * Express body-parser tries to convert the request body to JSON,
 * but sometimes when strings are force to it, it resolves to
 * a syntax error. This middleware catches that and return a
 * proper error
 * @param {} customResponse
 */
module.exports = function resolveSyntax(customResponse) {
  return function (error, req, res, next) {
    if (error instanceof SyntaxError) {
      const defaultErrorMessage = {
        status: 'error',
        message: 'Invalid JSON payload passed.',
        data: null,
      };
      return res.status(400).send(customResponse || defaultErrorMessage);
    }
    return next();
  };
};
