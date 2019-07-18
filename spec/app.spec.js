process.env.NODE_ENV = 'test'
const request = require('supertest')
const chai = require('chai')
const { expect } = chai
const connection = require('../db/connection.js')
const app = require('../app.js')
const chaiSorted = require('chai-sorted')
chai.use(chaiSorted)

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/*', () => {
    it('GET returns 404 and a page not founbd when passed an incorrect url', () => {
      return request(app)
        .get('/bunting')
        .expect(404)
        .then(res => { expect(res.body.msg).to.equal('page not found') })
    });

    describe('/topics', () => {
      it(' GET checks that topics is an array', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => { expect(body.topics).to.be.an('array') })
      });
      it('GET checks that the topics array contains the correct keys', () => {
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
      it(' GET returns status 200 and a user by their username with correct keys', () => {
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
    describe('/articles/:article_id', () => {
      it('GET returns status 200 and a article by the article_id with correct keys', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then(({ body }) => {
            // console.log(body)
            expect(body.article.article_id).to.equal(1)
            expect(body.article).to.have.keys('author', 'title', 'article_id',
              'body', 'topic', 'created_at', 'votes', 'comment_count');
            expect(+body.article.comment_count).to.equal(1)
            // TODO : prove comment count is working properly
          });
      });
      it(' returns status 404 when id doesn\'t exist', () => {
        return request(app)
          .get('/api/articles/bunting')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.be.equal('bad request');
          });
      });
      it('PATCH returns a patched article with votes increased by 1 and a status of 200 ', () => {
        return request(app)
          .patch('/api/articles/5')
          .send({ inc_votes: 1 })//send in the patch object
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.eql({
              article_id: 5,
              title: 'UNCOVERED: catspiracy to bring down democracy',
              body: 'Bastet walks amongst us, and the cats are taking arms!',
              votes: 1,
              topic: 'cats',
              author: 'rogersop',
              created_at: '2002-11-19T12:21:54.171Z'
            })
          })
      });
      it('returns status 400 when article doesn\'t exist', () => {
        return request(app)
          .patch('/api/articles/bunting')
          .send({ inc_votes: 1 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.be.equal('bad request');
          });
      });
      it('returns status 400 when inc_votes is not a number', () => {
        return request(app)
          .patch('/api/articles/5')
          .send({ inc_votes: 'bunting' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.be.equal('bad request');
          });
      });
    });
    describe('/article/:article_id/comments', () => {
      it('POST returns status 201 and a posted comment with username and body keys ', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'butter_bridge', body: 'I am an angry journalist, hear me roar!' })
          .expect(201)
          .then(({ body }) => {
            expect(body.comment).to.have.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
            expect(body.comment.article_id).to.equal(1)
            expect(body.comment.body).to.equal('I am an angry journalist, hear me roar!')
            expect(body.comment.author).to.equal('butter_bridge')
            // TODO: check the actual article id + body etc..
          })
      });
      it('GET returns a status 200 and an array of objects sorted by created_at in descending order', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.be.sortedBy('created_at', { descending: true })
          })
        //TODO: query errors)wait until after lecture
      })
    });

    describe('/api/article', () => {
      it('GET returns 200 and an articles array of article objects author, title, article_id,topic,created_at, votes and comment_count', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then((res) => {
            expect(res.body.article[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
          })
      });
      it('GET returns 200 and an array of objects sorted by created_at in descending order', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then((res) => {
            expect(res.body.article).to.be.sortedBy('created_at', { descending: true })
          })
      });
      it('GET returns an author query, which filters the articles by the username value specified in the query', () => {
        return request(app)
          .get('/api/articles?author=butter_bridge')
          .expect(200)
          .then((res) => {
            expect(res.body.article[0].author).to.equal('butter_bridge')
          })
      });
      it('GET returns a topic query, which filters the articles by the topic value specified in the query', () => {
        return request(app)
          .get('/api/articles?topic=cats')
          .expect(200)
          .then((res) => {
            expect(res.body.article[0].topic).to.equal('cats');
          })
      });
    });
    describe('/api/comments/:comment_id', () => {
      it('PATCH returns a patched comment with votes increased by 1 and a status of 200 ', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.votes).to.equal(17)
            expect(body.comment).to.have.all.keys(
              'body',
              'comment_id',
              'article_id',
              'author',
              'created_at',
              'votes'
            );
          })
      });
    });

  });

});
