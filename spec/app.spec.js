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
    it('GET returns 404 and a page not found when passed an incorrect url', () => {
      return request(app)
        .get('/bunting')
        .expect(404)
        .then(res => { expect(res.body.msg).to.equal('Page not found') })
    });
    describe('/api', () => {
      it('GET returns status 200 and a json object containing the api endpoints', () => {
        return request(app)
          .get('/api')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.have.keys('GET /api', 'GET /api/topics', 'GET /api/articles')
          });
      });
      it('Method not allowed: status 405 for /api', () => {
        return request(app)
          .delete('/api')
          .expect(405)
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
        it('Error returns status 404 and page not found when passed an incorrect url', () => {
          return request(app)
            .get('/api/bunting')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Page not found')
            })
        });
        it('Method not allowed: status 405 for /topics', () => {
          const invalidMethods = ['patch', 'put', 'post'];
          invalidMethods.map(method => {
            return request(app)
            [method]('/api/topics')
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal('Method not allowed');
              });
          });
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
        it('Error returns status 404 when user doesn\'t exist', () => {
          return request(app)
            .get('/api/users/bunting')
            .expect(404)
            .then(({ body }) => {
              console.log(body.msg)
              expect(body.msg).to.equal('page not found');
            });
        });
        it('Method not allowed: status 405 for /users', () => {
          const invalidMethods = ['patch', 'put', 'post'];
          invalidMethods.map(method => {
            return request(app)
            [method]('/api/users/lurker')
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal('Method not allowed');
              });
          });
        });

      });
      describe.only('/articles/:article_id', () => {
        it('GET returns status 200 and a article by the article_id with correct keys', () => {
          return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
              expect(body.article.article_id).to.equal(1)
              expect(body.article).to.have.keys('author', 'title', 'article_id',
                'body', 'topic', 'created_at', 'votes', 'comment_count');
            });
        });
        it('GET returns status 200 and a correct comment count', () => {
          return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
              expect(+body.article.comment_count).to.equal(13)
            })
        });
        it('Error returns 404 when path is not a valid number', () => {
          return request(app)
            .get("/api/articles/1000")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.eql('page not found');
            });
        });
        it('Error returns status 400 when id doesn\'t exist', () => {
          return request(app)
            .get('/api/articles/bunting')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.be.equal('Invalid syntax');
            });
        });
        it('Method not allowed: status 405 for /topics', () => {
          const invalidMethods = ['patch', 'put', 'post'];
          invalidMethods.map(method => {
            return request(app)
            [method]('/api/articles')
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal('Method not allowed');
              });
          });
        });
        it('PATCH returns a patched article with votes increased by 1 and a status of 200 ', () => {
          return request(app)
            .patch('/api/articles/5')
            .send({ inc_votes: 1 })
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
        it('PATCH returns a patched article with votes increased by 1 and a status of 200 when the original vote value was greater than 0', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.eql(101)
            })
        });
        it('PATCH returns a patched article with votes increased by 1 and a status of 200 when the original vote value was greater than 0', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({ inc_votes: '' })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.eql(100)
            })
        });
        it('Error returns status 400 when article doesn\'t exist', () => {
          return request(app)
            .patch('/api/articles/bunting')
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.be.equal('Invalid syntax');
            });
        });
        it('Error returns status 400 when inc_votes is not a number', () => {
          return request(app)
            .patch('/api/articles/5')
            .send({ inc_votes: 'bunting' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.be.equal('Invalid syntax');
            });
        });
        it('Error returns status 404 when path is not a valid number', () => {
          return request(app)
            .patch('/api/articles/5000')
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.be.equal('page not found');
            });
        });
        it('Error returns status 400 when no patch is sent', () => {
          return request(app)
            .patch('/api/articles/5')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.be.equal('No Body Found...');
            });
        });

        it('Method not allowed: status 405 for /articles/5', () => {
          const invalidMethods = ['put', 'post'];
          invalidMethods.map(method => {
            return request(app)
            [method]('/api/articles/5')
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal('Method not allowed');
              });
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
            })
        });
        it('Error returns status 400 if the post request doesn\'t contain the required keys', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ body: 'I am an angry journalist, hear me roar!' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal('Incorrect input')
            })
        });
        it('Error returns status 404 when path is not a valid number', () => {
          return request(app)
            .post('/api/articles/10000/comments')
            .send({ username: "butter_bridge", body: 'I am an angry journalist, hear me roar!' })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Article does not exist')
            })
        });
        it('Error returns status 404 and an incorrect path ', () => {
          return request(app)
            .post('/api/articles/1/bunting')
            .send({ username: 'butter_bridge', body: 'I am an angry journalist, hear me roar!' })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('Page not found')
            })
        });
        it('GET returns a status 200 and an array of objects sorted by created_at in descending order', () => {
          return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.descendingBy('created_at')
            })
        })
        it('GET returns status 200 and sorts by comment id', () => {
          return request(app)
            .get('/api/articles/1/comments?sort_by=comment_id')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.descendingBy('comment_id');
            })
        });
        it('GET returns status 200 and orders by ascending ', () => {
          return request(app)
            .get('/api/articles/1/comments?order=asc')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.ascendingBy('created_at');
            })
        });
        it('GET returns status 200 and uses both sort_by and order', () => {
          return request(app)
            .get('/api/articles/1/comments?order=asc&sort_by=comment_id')
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).to.be.ascendingBy('comment_id');
            })
        });
        it('Error returns status 400 when order is not ascending or descending', () => {
          return request(app)
            .get('/api/articles/1/comments?order=invalid')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal('Invalid query');
            })
        });
        it('Error returns 400 when comments using sort_by is invalid', () => {
          return request(app)
            .get('/api/articles/1/comments?sort_by=invalid')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal('Column not found');
            })
        });

        it('Error returns status 404 when passed an invalid article_id', () => {
          return request(app)
            .get('/api/articles/1000')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal('page not found')
            })
        });


        it('Method not allowed: status 405 for /api/articles/1/comments', () => {
          const invalidMethods = ['patch', 'put'];
          invalidMethods.map(method => {
            return request(app)
            [method]('/api/articles/1/comments')
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal('Method not allowed');
              });
          });
        });
      });
    });


    describe('/api/articles', () => {
      it('GET returns 200 and an articles array of article objects author, title, article_id,topic,created_at, votes and comment_count', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then((res) => {
            expect(res.body.articles[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
          })
      });
      it('GET returns 200 and an array of objects sorted by created_at in descending order', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy('created_at')
          })
      });
      it('GET returns 200 and an array of objects sorted by created_at in ascending order', () => {
        return request(app)
          .get('/api/articles?order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy('created_at')
          })
      });
      it('GET returns 200 and an array of objects sorted by author in ascending order', () => {
        return request(app)
          .get('/api/articles?order=asc&sort_by=author')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy('author')
          })
      });
      it('GET returns 200 and an array of objects sorted by topic in ascending order', () => {
        return request(app)
          .get('/api/articles?order=asc&sort_by=topic')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy('topic')
          })
      });
      it('GET returns 200 and an array of objects that has the same author', () => {
        return request(app)
          .get('/api/articles?author=butter_bridge')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].author).to.equal('butter_bridge')
          })
      });
      it('GET returns 200 and an array of mitch topics', () => {
        return request(app)
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].topic).to.equal('mitch')
          })
      });
      it('Error status 404 when an author doesn\'t exist', () => {
        return request(app)
          .get('/api/articles?author=invalid')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('Not Found!');
          })
      });
      it('Error status 404 when a topic doesn\'t exist', () => {
        return request(app)
          .get('/api/articles?topic=invalid')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('Not Found!');
          })
      });
      it('GET returns with all articles when filter is invalid', () => {
        return request(app)
          .get('/api/articles?invalid=mitch')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
          })
      });
      it('GET returns with all articles when filter is invalid', () => {
        return request(app)
          .get('/api/articles?invalid=butter_bridge')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
          })
      });
      it('Error returns 400 when passed an order that is not ascending or descending', () => {
        return request(app)
          .get('/api/articles?order=invalid&sort_by=topic')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('Invalid query')
          })
      });
      it('Error returns 400 when sort_by is invalid', () => {
        return request(app)
          .get('/api/articles?order=asc&sort_by=invalid')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('Column not found')
          })
      });
      it('Method not allowed: status 405 for /api/articles', () => {
        const invalidMethods = ['patch', 'put', 'post'];
        invalidMethods.map(method => {
          return request(app)
          [method]('/api/articles')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal('Method not allowed');
            });
        });
      });


      it('Error returns 404 when passed an incorrect path', () => {
        return request(app)
          .get('/api/bunting')
          .expect(404)
      });
      it('Error returns 400 when passed an incorrect path', () => {
        return request(app)
          .get('/api/articles/bunting')
          .expect(400)
      });

      it('Method not allowed: status 405 for /api/articles?author=butter_bridge', () => {
        const invalidMethods = ['patch', 'put', 'post'];
        invalidMethods.map(method => {
          return request(app)
          [method]('/api/articles?username=butter_bridge')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal('Method not allowed');
            });
        });
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
              'votes');
          })
      });
      it('Error returns 404 when there is no comments id ', () => {
        return request(app)
          .patch('/api/comments/')
          .send({ inc_votes: 1 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('Page not found')
          })
      });
      it('Error returns 404 when there is no comments id ', () => {
        return request(app)
          .patch('/api/comments/1000')
          .send({ inc_votes: 1 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('comment not found')
          })
      });
      it('Method not allowed: status 405 for /api/comments/1', () => {
        const invalidMethods = ['put', 'post', 'get'];
        invalidMethods.map(method => {
          return request(app)
          [method]('/api/comments/1')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal('Method not allowed');
            });
        });
      });
      it('Delete returns a status 204 ', () => {
        return request(app)
          .delete('/api/comments/1')
          .expect(204)
      });
      it('Error 400 when passed a nonexistent id', () => {
        return request(app)
          .delete('/api/comments/bunting')
          .expect(400)
      })
    });
    it('Error returns 404 when passed a valid comment_id that does not exist', () => {
      return request(app)
        .delete('/api/comments/1000')
        .expect(404)
    });
  });
})
