// for when using mocha sidebar
require('dotenv').config();

process.env.APP_ENVIRONMENT = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('./../../server/server');

chai.use(chaiHttp);

const { server } = app;
const { expect } = chai;

const preCheckRequest = (res, statusCodeToCheck) => {
    // console.log(JSON.stringify(res.body));

    expect(res.status).to.be.eql(statusCodeToCheck);
    expect(res.type).to.be.eql('application/json');
};

const getServerRequest = (url, response) => {
    chai.request(server)
        .get(url)
        .end(response);
};

exports.server = server;
exports.expect = expect;
exports.preCheckRequest = preCheckRequest;
exports.getServerRequest = getServerRequest;
