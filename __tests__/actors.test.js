const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Actor = require('../lib/models/Actor.js');

describe('r-b-h routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const newActor = {
        actorId: '4',
        actorName: 'Peter Piper',
        dob: '19680814',
        pob: 'Russia, OH',
    };

    it('posts new actors to db', () => {
        return request(app)
            .post('/api/actors')
            .send(newActor)
            .then((res) => {
                expect(res.body).toEqual({
                    actorId: '4',
                    ...newActor,
                });
            });
    });

    it('GET ALL actors from db', () => {
        return request(app)
            .get('/api/actors')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        actorId: '1',
                        actorName: 'Buffy Sandpaper',
                    },
                    {
                        actorId: '2',
                        actorName: 'Rupert Pettygrove',
                    },
                    {
                        actorId: '3',
                        actorName: 'Ice Q',
                    },
                ]);
            });
    });

    afterAll(() => {
        pool.end();
    });
});
