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
                    should.equal(err, null);
                    res.should.have.status(200);    
                    done();
                });
        });
    });
/*
    describe('/POST simian', () => {
        it('Retornará que o DNA é simian e status 200', (done) => {   
            let req = {
                dna: "'CTGAGA', 'CTCAGC', 'CATTGT', CGAGTG', 'CCCCTA', 'TCACTG'" 
            }
            chai.request(server)
                .post('/simian')
                .send(req)
                .end((err, res) => {
                    should.equal(err, null); 
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/POST simian', () => {
        it('Retornará que o DNA é humano e status 403', (done) => {   
            //var dna = "'CTGAGA', 'CTCAGC', 'TATTGT', 'AGAGTG', 'CGCCTA', 'TCACTG'";
            chai.request(server)
                .post('/simian')
                .send("'CTGAGA', 'CTCAGC', 'TATTGT', 'AGAGTG', 'CGCCTA', 'TCACTG'")
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(403);
                    done();
                });
        });
    });*/
});