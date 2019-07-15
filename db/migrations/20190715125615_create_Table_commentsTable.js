
exports.up = function (connection, Promise) {
  return connection.schema.createTable('comments', (commentData) => {
    commentData.increments('comment_id').primary();
    commentData.string('author').references('users.username');
    commentData.integer('article_id').references('articles.article_id');
    commentData.integer('votes').defaultTo(0);
    commentData.timestamp('created_at');
    commentData.text('body');
  })
};

exports.down = function (connection, Promise) {

};
