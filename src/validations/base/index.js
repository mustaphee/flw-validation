const { errorResponse } = require('../../utils/responses');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const baseValidator = (schema, req, res, next) => {
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    // return error immediately
    return errorResponse(res, 400, `${error.details[0].message}.`);
  }
  req.rawBody = req.body;
  req.body = value;
  return next();
};

module.exports = baseValidator;
