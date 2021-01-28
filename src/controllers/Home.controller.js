const get = require('lodash.get');
const { successResponse, errorResponse } = require('../utils/responses');
const { checkValues } = require('../utils/helpers');

const HOMEDATA = {
  name: 'Yusuff Mustapha',
  github: '@mustaphee',
  email: 'officialwebdev@gmail.com',
  mobile: '08160532895',
  twitter: '@dev_inately',
};

exports.homeReqHandler = (req, res) => successResponse(res, 200, 'My Rule-Validation API', HOMEDATA);

exports.ruleReqHandler = (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { field, condition, condition_value } = req.body.rule;
    // Check if nesting is greater than two levels deep
    if (field.split('.').length > 3) return errorResponse(res, 400, 'Nesting is deeper than 2 levels');
    const fieldValue = get(req.body.data, field);
    // null and 0 are values too, so using (!) is avoided
    if (fieldValue === undefined) return errorResponse(res, 400, `field ${field} is missing from data.`);
    const result = checkValues(fieldValue, condition_value, condition, field);

    if (result.error) return errorResponse(res, 400, `field ${field} failed validation.`, { validation: result });
    return successResponse(res, 200, `field ${field} successfully validated.`, { validation: result });
  } catch (error) {
    return next(error);
  }
};
