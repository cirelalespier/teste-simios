let server = require('./index.js');
const Simio = require('./models/Simian.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Simio', () => {
    beforeEach((done) => {
        Simio.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/GET stats', () => {
        it('Retornará as estatísticas de cadastro no banco', (done) => {
            chai.request(server)
                .get('/stats')
                .end((err, res) => {
                    res.should.have.status(200);    
                    done();
                });
        });
    });    
});