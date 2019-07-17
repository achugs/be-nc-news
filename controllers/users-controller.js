
const { getUsername } = require('../models/users-models');

exports.sendUsername = (req, res, next) => {
  const { username } = req.params;
  getUsername(username)
    .then(user => {
      if (!user) {
        return Promise.reject({ status: 404, msg: 'user not found' });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};

