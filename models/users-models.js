const connection = require('../db/connection');

exports.getUsername = username => {
  return connection
    .select('*')
    .from('users')
    .where('users.username', username)
};
