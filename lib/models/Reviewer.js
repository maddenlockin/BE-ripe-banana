const pool = require('../utils/pool.js');

module.exports = class Reviewer {
    reviewer_id;
    reviewer_name;
    company;

    constructor(row) {
        this.reviewerId = row.reviewer_id;
        this.reviewerName = row.reviewer_name;
        this.company = row.company;
    }

    static async create({ reviewerName, company }) {
        const { rows } = await pool.query(
            'INSERT INTO reviewers (reviewer_name, company) VALUES ($1, $2) RETURNING *',
            [reviewerName, company]
        );

        return new Reviewer(rows[0]);
    }
};