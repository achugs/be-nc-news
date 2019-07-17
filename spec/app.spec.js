process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const { expect } = require('chai');
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/*', () => {
    it('returns 404 and a page not founbd when passed an incorrect url', () => {
      return request(app)
        .get('/bunting')
        .expect(404)
        .then(res => { expect(res.body.msg).to.equal('page not found') })
    });

    describe('/topics', () => {
      it('checks that topics is an array', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => { expect(body.topics).to.be.an('array') })
      });
      it('checks that the topics array contains the correct keys', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(body.topics[0]).to.have.keys('slug', 'description')
          })
      });
      it('returns status 404 and page not found when passed an incorrect url', () => {
        return request(app)
          .get('/api/bunting')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('page not found')
          })
      });
    });
    describe('/users/:username', () => {
      it(' returns status 200 and a user by their username with correct keys', () => {
        return request(app)
          .get('/api/users/lurker')
          .expect(200)
          .then(({ body }) => {
            expect(body.user.username).to.equal('lurker');
            expect(body.user).to.have.keys('username', 'avatar_url', 'name');
          });
      });
      it(' returns status 404 when user doesn\'t exist', () => {
        return request(app)
          .get('/api/users/bunting')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.be.equal('user not found');

          });
      });
    });
    describe('/article/:article_id', () => {
      it('returns status 200 and a article by the article_id with correct keys', () => {
        return request(app)
          .get('/api/article/1')
          .expect(200)
          .then(({ body }) => {
            // console.log(body)
            expect(body.article.article_id).to.equal(1)
            expect(body.article).to.have.keys('author', 'title', 'article_id',
              'body', 'topic', 'created_at', 'votes', 'comment_count');
          });
      });
      it(' returns status 404 when id doesn\'t exist', () => {
        return request(app)
          .get('/api/article/bunting')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.be.equal('article not found');

          });
      });
    });
  });
});
