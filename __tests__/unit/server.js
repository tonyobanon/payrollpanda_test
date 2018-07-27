'use strict';

let joi = require('joi');

let server    = require('server');
let request   = require('supertest')(server);

describe('General endpoint handling', () => {

    afterEach(() => {
        // completely restore all fakes created through the sandbox
    });

    it('Get a URL that does not exist', (done) => {
        request.get('/v1/meh')
            .expect(404)
            .end(done);
    });

});