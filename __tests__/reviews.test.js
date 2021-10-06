const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('r-b-h routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const newReview = {
        rating: '3',
        reviewerId: '1',
        review: 'it was rotten bananas',
        filmId: '1'
    };

    it('posts new review to db', () => {
        return request(app)
            .post('/api/reviews')
            .send(newReview)
            .then((res) => { expect(res.body).toEqual({
                reviewId: '4',
                ...newReview,
            });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
