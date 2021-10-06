const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('r-b-h reviewer routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const newReviewer = {
        reviewerName: 'Tim Alan',
        company: 'Greg Norman Connection'
    };

    it('posts new reviewer to db', () => {
        return request(app)
            .post('/api/reviewers')
            .send(newReviewer)
            .then((res) => {
                expect(res.body).toEqual({
                    reviewerId: '4',
                    ...newReviewer,
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
