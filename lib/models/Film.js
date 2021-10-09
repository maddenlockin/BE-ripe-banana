const pool = require('../utils/pool.js');
const { getAllActors } = require('./Actor.js');

module.exports = class Film {
    filmId;
    title;
    studioId;
    released;

    constructor(row) {
        this.filmId = row.film_id;
        this.title = row.title;
        //this.studioId = row.studio_id;
        this.released = row.released;
        this.studio = {
            studioId: row.studio_id,
            studioName: row.studio_name,
        };
    }

    static async create({ title, studioId, released }) {
        const { rows } = await pool.query(
            'INSERT INTO films (title, studio_id, released) VALUES ($1, $2, $3) RETURNING *',
            [title, studioId, released]
        );
        return new Film(rows[0]);
    }

    static async getAllFilms() {
        const { rows } = await pool.query(
            `SELECT film_id, title, released, studio_id, studio_name 
            FROM films 
            INNER JOIN studios 
            ON studios.id = films.studio_id`
        );
        console.log('9999999', rows);
        return await rows.map((row) => {
            return new Film(row);
        });
    }

    static async getFilmsById(id) {
        const films = await pool.query(
            `SELECT title, released, studios.id, studio_name
            FROM films 
            INNER JOIN studios
            ON studios.id = films.studio_id
            WHERE film_id = ($1)`,
            [id]
        );
        const filmsRows = films.rows[0];

        const cast = await pool.query(
            `SELECT actors.actor_id, actors.actor_name
            FROM actors
            INNER JOIN actors_films
            ON actors.actor_id = actors_films.actor_id
            WHERE film_id = ($1)`,
            [id]
        );
        const castRows = cast.rows;

        const reviews = await pool.query(
            `
        SELECT reviews.review_id, reviews.rating, reviews.review
        FROM reviews
        INNER JOIN reviewers
        ON reviews.reviewer_id = reviewers.reviewer_id
        WHERE review_id = ($1)`,
            [id]
        );
        const reviewsRows = reviews.rows;

        return {
            title: filmsRows.title,
            released: filmsRows.released,
            studio: { name: filmsRows.studio_name, id: filmsRows.id },
            cast: castRows.map((cast) => ({
                id: cast.actor_id,
                name: cast.actor_name,
            })),
            reviews: [
                {
                    id: '2',
                    rating: '1',
                    review: 'I have known kettles of fish more interesting than this film',
                    reviewer: { id: '2', name: 'Billy Fakenflick' },
                },
            ],
        };
    }
};
