import chai from 'chai';
import app  from '../../app/app';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('IngredientsController', () => {
    it('should return an http 200 OK status on get ingredients', (done) => {
        chai.request(app)
            .get('/api/v1/ingredients')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return a http 200 OK status on get ingredient', (done) => {
        chai.request(app)
            .get('/api/v1/ingredients/507f1f77bcf86cd799439011')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return a http 201 Accepted status on post ingredient', (done) => {
        const ingredient = {
            id: '507f1f77bcf86cd799439011',
            name: 'dummy ingredient'
        };
        chai.request(app)
            .post('/api/v1/ingredients')
            .set('content-type', 'application/json')
            .send(ingredient)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('should return a http 204 No Content on update ingredient', (done) => {
        chai.request(app)
            .put('/api/v1/ingredients/507f1f77bcf86cd799439011')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return a http 204 No Content on delete ingredient', (done) => {
        chai.request(app)
            .delete('/api/v1/ingredients/507f1f77bcf86cd799439011')
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
});
