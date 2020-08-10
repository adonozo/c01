import chai from 'chai';
import app  from '../../app/app';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('RecipesController', () => {
    it('should return a http 200 OK status on get recipes',  (done) => {
        chai.request(app)
            .get('/api/v1/recipes')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return a 200 OK status on get recipe', (done) => {
        chai.request(app)
            .get('/api/v1/recipes/57813c18d1')
            .end(((err, res) => {
                res.should.have.status(200);
                done();
            }));
    });

    it('should return a 201 Accepted status on post recipe', (done) => {
        const recipe = {
            id: '57813c18d1',
            name: 'dummy recipe'
        };
        chai.request(app)
            .post('/api/v1/recipes')
            .set('content-type', 'application/json')
            .set(recipe)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('should return a 200 OK status on recipe updated', (done) => {
        chai.request(app)
            .put('/api/v1/recipes/57813c18d1')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return a 204 No Content on delete recipe', (done) => {
        chai.request(app)
            .delete('/api/v1/recipes/57813c18d1')
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
});
