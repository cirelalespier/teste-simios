let server = require('./index.js');
const Simio = require('./models/Simian.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

var dna = '["CTG​A​G​A","CTG​A​G​C","T​AT​T​G​T","​A​GAG​G​G","​CCCC​TA","TCACTG"]';

describe('Books', () => {
    beforeEach((done) => {
        Simio.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/GET stats', () => {
        it('retornará as estatísticas de cadastro no banco', (done) => {
            chai.request(server)
                .get('/stats')
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('string');
                    //res.body.length.should.be.eql(46);
                    done();
                });
        });
    });

    describe('/POST simian', () => {
        it('retornará se um DNA é simio ou humano', (done) => {            
            chai.request(server)
                .post('/simian')
                .send(dna)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

});