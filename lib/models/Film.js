const pool = require('../utils/pool.js');

module.exports = class Film {
    filmId;
    title;
    studioId;
    released;

    constructor(row) {
        this.filmId = row.film_id;
        this.title = row.title;
        this.studioId = row.studio_id;
        this.released = row.released;
    }

    static async create({ title, studioId, released }) {
        const { rows } = await pool.query(
            'INSERT INTO films (title, studio_id, released) VALUES ($1, $2, $3) RETURNING *',
            [title, studioId, released]
        );
        return new Film(rows[0]);
    }
};
