const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Reviewer = require('../lib/models/Reviewer.js');

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
                        reviewerId: '1',
                        reviewerName: 'Windy Cyan',
                        company: 'Clickbait Weekly',
                    },
                    {
                        reviewerId: '2',
                        reviewerName: 'Billy Fakenflick',
                        company: 'Diatribe Gazette',
                    },
                    {
                        reviewerId: '3',
                        reviewerName: 'Edgar Timpani',
                        company: 'Olfactory Post',
                    },
                    {
                        reviewerId: '4',
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
