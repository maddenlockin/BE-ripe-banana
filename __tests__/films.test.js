const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Film = require('../lib/models/Film.js');
const Studio = require('../lib/models/Studio.js');

describe('r-b-h routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const film = {
        title: 'Appendectomy Unlimited',
        studioId: '3',
        released: '1963',
    };

    it('posts new film to db', () => {
        return request(app)
            .post('/api/films')
            .send(film)
            .then((res) => {
                expect(res.body).toEqual({
                    filmId: '4',
                    title: 'Appendectomy Unlimited',
                    studio: {studioId: '3'},
                    released: '1963'
                });
            });
    });

    it('should GET all films', async () => {

        await Film.create(film);
        return request(app)
            .get('/api/films')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        filmId: '1',
                        title: 'Hardwood Variations',
                        released: '1971',
                        studio: {
                            studioId: '1',
                            studioName: 'Blowfish Allures',
                        },
                    },
                    {
                        filmId: '2',
                        title: 'Wince-Worthy Whispers',
                        released: '2003',
                        studio: {
                            studioId: '2',
                            studioName: 'Piglet Party',
                        },
                    },
                    {
                        filmId: '3',
                        title: 'Blatherings of Banality',
                        released: '2016',
                        studio: {
                            studioId: '3',
                            studioName: 'Cloudy Iceberg',
                        },
                    },
                    {
                        filmId: '4',
                        title: 'Appendectomy Unlimited',
                        released: '1963',
                        studio: {
                            studioId: '3',
                            studioName: 'Cloudy Iceberg',
                        },
                    },
                ]);
            });
    });

    afterAll(() => {
        pool.end();
    });
});
