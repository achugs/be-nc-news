const connection = require('../db/connection');

const getTopics = () => {
  return connection.select('*').from('topics');
}

const getUsers = () => {
  return connection.select('*').from('users');
}
module.exports = { getTopics, getUsers };