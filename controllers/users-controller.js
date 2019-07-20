
const { getUsername } = require('../models/users-models');

exports.sendUsername = (req, res, next) => {
  const { username } = req.params;
  getUsername(username)
    .then(user => {
      if (!user.length) {
        return next({ status: 404, msg: 'page not found' });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};



