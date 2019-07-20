
exports.up = (connection, Promise) => {
  return connection.schema.createTable('users', (userData) => {
    userData.string('username').unique().primary();
    userData.string('name').notNullable();
    userData.string('avatar_url');

  })

};

exports.down = (connection, Promise) => {
  return connection.schema.dropTable('users');
};
