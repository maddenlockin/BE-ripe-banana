const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Actor = require('../lib/models/Actor.js');

describe('r-b-h routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const actor = {
        actorId: '4',
        actorName: 'Peter Piper',
        dob: '19680814',
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

    it('GET ALL actors from db', async () => {
        await Actor.create(actor);
        return request(app)
            .get('/api/actors')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        actorId: '1',
                        actorName: 'Buffy Sandpaper',
                        dob: '19520214',
                        pob: 'Arid Canal, TX',
                    },
                    {
                        actorId: '2',
                        actorName: 'Rupert Pettygrove',
                        dob: '19810601',
                        pob: 'Lost Island, NY',
                    },
                    {
                        actorId: '3',
                        actorName: 'Ice Q',
                        dob: '20051111',
                        pob: 'Mossy Gulch, KY',
                    },
                ]);
            });
    });

    afterAll(() => {
        pool.end();
    });
});
