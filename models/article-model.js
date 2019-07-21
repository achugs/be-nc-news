const connection = require('../db/connection');

exports.getArticleById = (article_id) => {
  return connection
    .first('articles.*')
    .count({ comment_count: 'comments.comment_id' })
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .where('articles.article_id', article_id)
    .then(article => {
      if (!article) {
        return Promise.reject({ status: 404, msg: 'page not found' });
      } else {
        return article
      }
    })
}

exports.getArticlePatch = ({ article_id }, { inc_votes = 0 }) => {
  return connection
    .select('*')
    .from('articles')
    .where('articles.article_id', article_id)
    .increment('votes', inc_votes)
    .returning("*")
    .then((article) => {
      if (!article.length) {
        return Promise.reject({ status: 404, msg: 'page not found' });
      } return article[0];
    })
}

exports.getArticles = ({ sort_by = 'created_at', order = 'desc', author, topic }) => {
  if (order !== 'desc' && order !== 'asc') return Promise.reject({ status: 400, msg: 'Invalid query' })
  return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .count({ comment_count: 'comments.comment_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where({ 'articles.author': author });
      if (topic) query.where({ 'articles.topic': topic });
    }).then(articles => {
      if (!articles.length && (topic || author))
        return Promise.reject({ status: 404, msg: 'Not Found!' });
      return articles;
    });
};