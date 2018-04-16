'use strict';

const assert    = require('assert');
const helpers   = require('./test_helpers.js');

const config    = helpers.getConfig();
const uri       = helpers.runApp(config, 'privacy-policy');

let response = {};

before((done) => {
    helpers.preFetch(uri, (res) => {
        response = res;
        done();
    });
});

describe('privacy-policy', () => {
    it('works', (done) => {
        helpers.assert.itWorks(response.statusCode, done);
    });

    it('valid html', (done) => {
        helpers.assert.validHTML(response, done);
    });

    it('contains authors', (done) => {
        config.authors.forEach((author) => {
            assert(response.body.includes(author), `Expects response body to include "${author}"`);
        });
        done();
    });

    it('has header', (done) => {
        assert(response.body.includes('<h2>Privacy Policy of'),
            'Expects response body to include Privacy Policy header');
        done();
    });
});