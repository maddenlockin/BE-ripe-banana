const pool = require('../utils/pool.js');

module.exports = class Actor {
    actorId;
    actorName;
    dob;
    pob;
    // filmId;
    // film;

    constructor(row) {
        this.actorId = row.actor_id;
        this.actorName = row.actor_name;
        this.dob = row.dob;
        this.pob = row.pob;
        // this.film = {
        //     filmId: row.film_id,
        //     title: row.title,
        //     released: row.released,
        // };
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
        WHERE actor_id = ($1)`,
            [id]
        );
        const actorRows = result.rows[0];

        const { rows } = await pool.query(
            //revert BACK to similar as FILMjs getFILMSBYID
            `
        SELECT films.film_id, films.title, films.released 
        FROM films
        LEFT JOIN actors_films
        ON films.film_id = actors_films.film_id
        LEFT JOIN actors
        ON actors.actor_id = actors_films.actor_id
        WHERE actors.actor_id = ($1)`,
            [id]
        );
        const actors = new Actor(result.rows[0]);
        return {
            ...actors,
            Films: rows,
        };
    }
};
