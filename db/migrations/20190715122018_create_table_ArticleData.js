
exports.up = (connection, Promise) => {
  return connection.schema.createTable('articles', (articleData) => {
    articleData.increments('article_id').primary();
    articleData.string('title').notNullable();
    articleData.text('body').notNullable();
    articleData.integer('votes').defaultTo(0);
    articleData.string('topic').references('topics.slug').notNullable();
    articleData.string('author').references('users.username').notNullable();
    articleData.timestamp('created_at').defaultTo(connection.fn.now());;
  })
};

exports.down = (connection, Promise) => {
  return connection.schema.dropTable('articles');
};





