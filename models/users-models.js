const connection = require('../db/connection');

exports.getUsername = username => {
  return connection
    .first('*')
    .from('users')
    .where('username', '=', username);
};
