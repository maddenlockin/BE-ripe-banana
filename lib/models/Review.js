const pool = require('../utils/pool.js');

module.exports = class Review {
    reviewId;
    rating;
    reviewerId;
    review;
    filmId;
    film;


    constructor(row) {
        this.reviewId = row.review_id;
        this.rating = row.rating;
        this.reviewerId = row.reviewer_id;
        this.review = row.review;
        //this.filmId = row.film_id;
        this.film = {
            filmId: row.film_id,
            title: row.title
        }
    }

    static async create({ rating, reviewerId, review, filmId }) {
        const { rows } = await pool.query(
            'INSERT INTO reviews (rating, reviewer_id, review, film_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [rating, reviewerId, review, filmId]
        );

        return new Review(rows[0]);
    }

    static async getAllReviews() {
        const { rows } = await pool.query(
            `SELECT review_id, rating, review, films.film_id, films.title 
            FROM reviews 
            INNER JOIN films 
            ON films.film_id = reviews.film_id
            LIMIT 100`
        );
        return await rows.map((row) => {
            return new Review(row);
        })
    }
};