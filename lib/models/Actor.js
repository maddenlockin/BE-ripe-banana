const pool = require('../utils/pool.js');

module.exports = class Actor {
    actorId;
    actorName;
    dob;
    pob;

    constructor(row) {
        this.actorId = row.actor_id;
        this.actorName = row.actor_name;
        this.dob = row.dob;
        this.pob = row.pob;
    }

    static async create({ actorName, dob, pob }) {
        const { rows } = await pool.query(
            `INSERT INTO actors (actor_name, dob, pob)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [actorName, dob, pob]
        );
        return new Actor(rows[0]);
    }

    static async getAllActors() {
        const { rows } = await pool.query(
            'SELECT actor_id, actor_name FROM actors'
        );
        return rows.map((row) => new Actor(row));
    }

    static async getActorById(id) {
        const result = await pool.query(
            `
        SELECT *
        FROM actors
        INNER JOIN actors_films
        ON actors.actor_id = actors_films.actor_id
        WHERE actors.actor_id = ($1)`,
            [id]
        );
        const actorRows = result.rows[0];

        const { rows } = await pool.query(
            `
        SELECT films.film_id, films.title, films.released 
        FROM films
        LEFT JOIN actors_films
        ON films.film_id = actors_films.film_id
        WHERE actors_films.actor_id = ($1)`,
            [id]
        );
        const filmRows = rows[0];
        return {
            actorId: actorRows.actor_id,
            actorName: actorRows.actor_name,
            dob: actorRows.dob,
            pob: actorRows.pob,
            films: [
                {
                    filmId: filmRows.film_id,
                    title: filmRows.title,
                    released: filmRows.released,
                },
            ],
        };
    }
};
