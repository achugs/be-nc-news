const connection = require('../db/connection');

exports.getArticles = (article_id) => {
  return connection
    .first('articles.*')
    .count({ comment_count: 'comments.article_id' })
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.comment_id')
    .groupBy('articles.article_id')
    .where('articles.article_id', article_id)
    .then(article => {
      // console.log(!article, 'article?');
      if (!article) {
        return Promise.reject({ status: 404, msg: 'bad request' });
      } else {
        // console.log(article, 'model')
        return article
      }
    })
}

exports.getArticlePatch = ({ article_id }, { inc_votes }) => {

  return connection.from('articles').where('articles.article_id', article_id)
    .increment('votes', inc_votes)
    .returning("*").then((article) => {
      if (!article.length) {
        return Promise.reject({ status: 400, msg: 'bad request' });
      } else {
        console.log(article)
        return article[0];
      }
    })
}