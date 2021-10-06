const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Studio = require('../lib/models/Studio.js');
const Film = require('../lib/models/Film.js');

describe('r-b-h routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const studio = {
        studioName: 'Ripe Banana Hell',
        city: 'Portland',
        state: 'OR',
        country: 'USA',
    };

    it('POSTS new studio to db', () => {
        return request(app)
            .post('/api/studios')
            .send(studio)
            .then((res) => {
                expect(res.body).toEqual({
                    studioId: '1',
                    ...studio,
                });
            });
    });

    it('should GET all studios', async () => {
        await Studio.create(studio);
        return request(app)
            .get('/api/studios')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        studioId: '1',
                        studioName: 'Ripe Banana Hell',
                    },
                ]);
            });
    });

    it('should GET a studio by id', async () => {
        await Studio.create(studio);
        const film = await Film.create({
            title: 'Something Stupid',
            studioId: '1',
            released: '1987',
        });
        return request(app)
            .get('/api/studios/1')
            .then((res) => {
                // console.log(res.body);
                expect(res.body).toEqual({
                    studioId: '1',
                    studioName: 'Ripe Banana Hell',
                    city: 'Portland',
                    state: 'OR',
                    country: 'USA',
                    Films: [
                        {
                            film_id: '1',
                            title: 'Something Stupid',
                        },
                    ],
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
