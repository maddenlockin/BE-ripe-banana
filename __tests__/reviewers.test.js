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

        it('should GET all reviewers', async () => {
        await Reviewer.create(newReviewer);
        return request(app)
            .get('/api/reviewers')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        reviewerName: 'Windy Cyan',
                        company: 'Clickbait Weekly',
                    },
                    {
                        reviewerName: 'Billy Fakenflick',
                        company: 'Diatribe Gazette',
                    },
                    {
                        reviewerName: 'Edgar Timpani',
                        company: 'Olfactory Post',
                    },
                    {
                        reviewerName: 'Tim Alan',
                        company: 'Greg Norman Connection',
                    },
                ]);
            });
    });

    afterAll(() => {
        pool.end();
    });
});
