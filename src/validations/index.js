const Joi = require('joi');
const baseValidator = require('./base');
const { VALID_CONDITIONS } = require('../utils/constants');

const ruleField = Joi.object().keys({
  field: Joi.string().required()
    .messages({
      'string.base': '{{#label}} should be a string',
    }),
  condition: Joi.string().required().valid(...VALID_CONDITIONS).required()
    .messages({
      'string.base': '{{#label}} must be one of {{#peersWithLabels}}',
    }),
  condition_value: Joi.alternatives().try(Joi.string(), Joi.number(), Joi.array()).required().allow(null, '')
    .messages({
      'any.required': '{{#label}} is required',
    }),
});

const validateRulesSchema = Joi.object().keys({
  rule: ruleField.required()
    .messages({
      'object.base': '{{#label}} should be an object',
    }),

  data: Joi.alternatives().try(Joi.array().min(1), Joi.object(), Joi.string()).required()
  ,
});

module.exports = {
  validateRules: (req, res, next) => baseValidator(validateRulesSchema, req, res, next),
};
