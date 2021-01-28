const { Router } = require('express');
const Home = require('../controllers/Home.controller');
const validations = require('../validations');

const router = new Router();

router.get('/', Home.homeReqHandler)
  .post('/validate-rule', validations.validateRules, Home.ruleReqHandler);

module.exports = router;
