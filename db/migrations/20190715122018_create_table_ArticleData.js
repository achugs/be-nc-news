
exports.up = (connection, Promise) => {
  return connection.schema.createTable('articles', (articleData) => {
    articleData.increments('article_id').primary();
    articleData.string('title');
    articleData.text('body');
    articleData.integer('votes').defaultTo(0);
    articleData.string('topic').references('topics.slug');
    articleData.string('author').references('users.username');
    articleData.timestamp('created_at');
  })
};

exports.down = (connection, Promise) => {
  return connection.schema.dropTable('articles');
};
