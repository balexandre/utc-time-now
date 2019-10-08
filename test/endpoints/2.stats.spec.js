const { expect, getServerRequest, preCheckRequest } = require('./index');

describe('Endpoint > Stats', () => {
    it('should get count for specific IP', done => {
        getServerRequest('/stats/::ffff:127.0.0.1', (err, res) => {
            if (err) {
                done(err);
            } else {
                preCheckRequest(res, 200);
                // check for schema
                expect(res.body).to.include.all.keys('ip', 'totalCount');
                expect(res.body.totalCount > 0).to.be.eql(true);
                done();
            }
        });
    });
});
