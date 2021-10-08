const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Review = require('../lib/models/Review.js');

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
            .then((res) => { 
                //console.log(res.body)
                expect(res.body).toEqual({
                reviewId: '4',
                rating: '3',
                reviewerId: '1',
                review: 'it was rotten bananas',
                film: {filmId: '1'}
            });
            });
    });
        it('should GET all reviews', async () => {
        await Review.create(newReview);
        return request(app)
            .get('/api/reviews')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        reviewId: '1',
                        rating: '4',
                        review: 'I laughed until I forgot what I was laughing about',
                        film: {
                            filmId: '3',
                            title: 'Blatherings of Banality'
                        }
                    },
                    {
                        reviewId: '2',
                        rating: '1',
                        review: 'I have known kettles of fish more interesting than this film',
                        film: {
                            filmId: '1',
                            title: 'Hardwood Variations'
                        }
                    },
                    {
                        reviewId: '3',
                        rating: '2',
                        review: 'If only this movie had been shown in Smellovision',
                        film: {
                            filmId: '2',
                            title: 'Wince-Worthy Whispers'
                        }
                    },
                    {
                        reviewId: '4',
                        rating: '3',
                        review: 'it was rotten bananas',
                        film: {
                            filmId: '1',
                            title: 'Hardwood Variations'
                        }
                    },
                ]);
            });
    });

    afterAll(() => {
        pool.end();
    });
});
