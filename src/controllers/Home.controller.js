const { successResponse } = require('../utils/responses');

const HOMEDATA = {
  name: 'Yusuff Mustapha',
  github: '@mustaphee',
  email: 'officialwebdev@gmail.com',
  mobile: '08160532895',
  twitter: '@dev_inately',
};

exports.homeReqHandler = (req, res) => successResponse(res, 200, 'My Rule-Validation API', HOMEDATA);
