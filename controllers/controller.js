const { getTopics, getUsers } = require('../models/model');

const sendTopics = (req, res, next) => {
  getTopics().then(topics => {
    res.status(200).send({ topics });
  }).catch(next);
}

const sendUsers = (req, res, next) => {
  getUsers().then(users => {
    res.status(200).send({ users });
  }).catch(err => console.log(err));
}

module.exports = { sendTopics, sendUsers };