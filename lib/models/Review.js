const pool = require('../utils/pool.js');

module.exports = class Review {
    review_id;
    rating;
    reviewer_id;
    review;
    film_id;

    constructor(row) {
        this.reviewId = row.review_id;
        this.rating = row.rating;
        this.reviewerId = row.reviewer_id;
        this.review = row.review;
        this.filmId = row.film_id;
    }

    static async create({ rating, reviewerId, review, filmId }) {
        const { rows } = await pool.query(
            'INSERT INTO reviews (rating, reviewer_id, review, film_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [rating, reviewerId, review, filmId]
        );

        return new Review(rows[0]);
    }

    static async getAllReviews() {
        const result = await pool.query('SELECT review_id, rating, review FROM reviews');
        const reviewsArr = await result.rows.map((row) => row)
        const { rows } = await pool.query(
            'SELECT review_id, rating, review, film_id, title FROM reviews INNER JOIN films ON films.film_id = reviews.film_id'
        );
        const Return = await reviewsArr.map((row) => {
            const reviewsObj
            return {...row, film: rows};
        })
    }
};