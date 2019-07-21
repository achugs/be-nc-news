
const { sendJSON } = require('../models/endpoints-model');

exports.getApiJSON = (req, res, next) => {
  const json = sendJSON();
  res.status(200).send(json);
}