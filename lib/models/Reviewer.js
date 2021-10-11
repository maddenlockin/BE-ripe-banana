const pool = require('../utils/pool.js');

module.exports = class Reviewer {
    reviewerId;
    reviewerName;
    company;

    constructor(row) {
        this.reviewerId = row.reviewer_id;
        this.reviewerName = row.reviewer_name;
        this.company = row.company;
    }

    static async create({ reviewerName, company }) {
        const { rows } = await pool.query(
            `INSERT INTO reviewers (reviewer_name, company) 
            VALUES ($1, $2) 
            RETURNING *`,
            [reviewerName, company]
        );

        return new Reviewer(rows[0]);
    }

    static async getAllReviewers() {
        const { rows } = await pool.query(
            `SELECT reviewer_id, reviewer_name, company 
            FROM reviewers`
        );
        return rows.map((row) => new Reviewer(row));
    }

    static async getReviewerById(id) {
        const result = await pool.query(
            `SELECT * 
            FROM reviewers 
            WHERE reviewer_id = ($1)`,
            [id]
        );
        const reviewer = result.rows[0];
        const resultsTwo = await pool.query(
            `SELECT review_id, rating, review
            FROM reviews 
            WHERE reviewer_id = ($1)`,
            [id]
        );
        const reviewsRow = resultsTwo.rows[0];

        const { rows } = await pool.query(
            `SELECT films.film_id, title
            FROM films
            LEFT JOIN reviews
            ON films.film_id = reviews.film_id
            WHERE reviews.reviewer_id =($1)`,
            [id]
        );
        const filmsRows = rows[0];

        return {
            reviewerId: reviewer.reviewer_id,
            reviewerName: reviewer.reviewer_name,
            company: reviewer.company,
            reviews: [
                {
                    reviewId: reviewsRow.review_id,
                    rating: reviewsRow.rating,
                    review: reviewsRow.review,
                    film: {
                        filmId: filmsRows.film_id,
                        title: filmsRows.title,
                    },
                },
            ],
        };
    }

    static async update({ reviewerId, reviewerName, company }) {
        const { rows } = await pool.query(
            'UPDATE reviewers SET reviewer_name=$2, company=$3 WHERE reviewer_id=$1 RETURNING *',
            [reviewerId, reviewerName, company]
        );
        return new Reviewer(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM reviewers 
            WHERE $1 NOT IN
            (SELECT reviewers.reviewer_id 
            FROM reviewers
            INNER JOIN reviews
            ON reviews.reviewer_id = reviewers.reviewer_id
            WHERE reviews.reviewer_id = $1)
            AND reviewers.reviewer_id = $1
            RETURNING *`,
            [id]
        );
        if (!rows[0]) return 'cannot delete reviewer data';
        return new Reviewer(rows[0]);
    }
};
