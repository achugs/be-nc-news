exports.up = (connection, Promise) => {
  return connection.schema.createTable('topics', (topicData) => {
    topicData.string('slug').primary();
    topicData.string('description').notNullable();
  })
};

exports.down = (connection, Promise) => {
  return connection.schema.dropTable('topics');
};