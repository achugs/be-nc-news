const { getTopics, getUsers } = require('../models/model');

sendTopics = (req, res, next) => {
  getTopics().then(topics => {
    res.status(200).send({ topics });
  }).catch(next);
}

sendUsers = (req, res, next) => {
  getUsers().then(users => {
    res.status(200).send({ users });
  }).catch(err => console.log(err));
}

module.exports = { sendTopics, sendUsers };