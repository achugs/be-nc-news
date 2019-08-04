const connection = require('../db/connection');

exports.getUsername = (username) => {
  return connection
    .select('*')
    .where({ username })
    .from('users')
    .then(user => {
      if (!user.length) {
        return Promise.reject({ status: 404, msg: 'page not found' });
      }
      return user
    })

};
