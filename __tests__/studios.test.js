const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Studio = require('../lib/models/Studio.js');

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

    it('posts new studio to db', () => {
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

    it('should get all studios', async () => {
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

    //will need to add FILMS later
    it('should GET a studio by id', async () => {
        const entry = await Studio.create(studio);
        return request(app)
            .get('/api/studios/1')
            .then((res) => {
                expect(res.body).toEqual(entry);
            });
    });

    afterAll(() => {
        pool.end();
    });
});
