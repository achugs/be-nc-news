
exports.up = function (connection, Promise) {
  return connection.schema.createTable('comments', (commentData) => {
    commentData.increments('comment_id').primary();
    commentData.string('author').references('users.username').notNullable();
    commentData.integer('article_id').references('articles.article_id');
    commentData.integer('votes').defaultTo(0);
    commentData.timestamp('created_at').defaultTo(connection.fn.now());;
    commentData.text('body').notNullable();
  })
};

exports.down = (connection, Promise) => {
  return connection.schema.dropTable('comments');
};
