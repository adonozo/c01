import chai from 'chai';
import app  from '../../app/app';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('HealthController', () => {
    it('should return an http OK status', (done) => {
        chai.request(app)
            .get('/api/v1/health')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return an object', (done) => {
        chai.request(app)
            .get('/api/v1/health')
            .end((err, res) => {
                res.body.id.should.be.a('string');
                done();
            })
    });
});
