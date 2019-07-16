const connection = require('../db/connection');

getTopics = () => {
  return connection.select('*').from('topics');
}

getUsers = () => {
  return connection.select('*').from('users');
}
module.exports = { getTopics, getUsers };