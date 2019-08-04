
const { getUsername } = require('../models/users-models');

exports.sendUsername = (req, res, next) => {
  const { username } = req.params;
  getUsername(username)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
