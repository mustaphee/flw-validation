const { Router } = require('express');
const Home = require('../controllers/Home.controller');

const router = new Router();

router.get('/', Home.homeReqHandler);

module.exports = router;
