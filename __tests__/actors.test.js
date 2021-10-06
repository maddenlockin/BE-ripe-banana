const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('r-b-h routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const actor = {
        actorId: 4,
        actorName: 'Peter Piper',
        dob: 19680814,
        pob: 'Russia, OH',
    };

    it('posts new actors to db', () => {
        return request(app)
            .post('/api/actors')
            .send(actor)
            .then((res) => {
                expect(res.body).toEqual({
                    actorId: '4',
                    ...actor,
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
