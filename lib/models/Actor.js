const pool = require('../utils/pool.js');

module.exports = class Actor {
    actor_id;
    actor_name;
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
        WHERE id = ($1)`,
            [id]
        );
        const actor = new Actor(result.rows[0]);
        const { rows } = await pool.query(
            `
        SELECT film_id, title, released 
        FROM films
        WHERE actor_id = ($1)`,
            [id]
        );
        return {
            ...actor,
            Films: rows,
        };
    }
};
