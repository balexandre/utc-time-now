const moment = require('moment');

const { expect, getServerRequest, preCheckRequest } = require('./index');

describe('Endpoint > Time', () => {
    it('should get 200 for unknown url', done => {
        getServerRequest('/unknown-url', (err, res) => {
            if (err) {
                done(err);
            } else {
                preCheckRequest(res, 200);
                // check for schema
                expect(res.body).to.include.all.keys('iso', 'date', 'dateFormat', 'ip');
                done();
            }
        });
    });
    it('should get correct json body', done => {
        const now = moment().utc();
        getServerRequest('/time', (err, res) => {
            if (err) {
                done(err);
            } else {
                preCheckRequest(res, 200);
                // iso
                expect(res.body.iso.endsWith('Z')).to.be.eql(true);
                expect(res.body.iso.indexOf(now.format('YYYY-MM-DDTHH:mm:ss'))).to.be.eql(0);
                // date
                expect(res.body.date.indexOf(now.format('YYYY-MM-DD HH:mm:ss'))).to.be.eql(0);
                expect(res.body.date.indexOf(now.format('YYYY-MM-DD HH:mm:ss'))).to.be.eql(0);
                // dateFormat
                expect(res.body.dateFormat).to.be.eql('YYYY-MM-DD HH:mm:ss');
                // ip
                expect(res.body.ip).to.be.eql('::ffff:127.0.0.1');
                done();
            }
        });
    });
});
