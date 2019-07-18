const connection = require('../db/connection');

exports.getArticleById = (article_id) => {
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
  return connection
    .from('articles')
    .where('articles.article_id', article_id)
    .increment('votes', inc_votes)
    .returning("*").then((article) => {
      if (!article.length) {
        return Promise.reject({ status: 400, msg: 'bad request' });
      } else {
        return article[0];
      }
    })
}

exports.getArticles = ({ sort_by, order, author, topic }) => {

  return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by || 'articles.created_at', order || 'desc')
    .modify(query => {
      if (author) query.where('articles.author', author);
      if (topic) query.where('articles.topic', topic);
    })
    .then((article) => {
      if (!article.length) {
        return Promise.reject({ status: 400, msg: 'bad request' });
      } else {
        return article;
      }
    })
}


