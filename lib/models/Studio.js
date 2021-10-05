const pool = require('../utils/pool.js');

module.exports = class Studio {
    id;
    studio_name;
    city;
    state;
    country;

    constructor(row) {
        this.studioId = row.id;
        this.studioName = row.studio_name;
        this.city = row.city;
        this.state = row.state;
        this.country = row.country;
    }

    static async create({ studioName, city, state, country }) {
        const { rows } = await pool.query(
            'INSERT INTO studios (studio_name, city, state, country) VALUES ($1, $2, $3, $4) RETURNING *',
            [studioName, city, state, country]
        );

        return new Studio(rows[0]);
    }

    static async getAllStudios() {
        const { rows } = await pool.query(
            'SELECT id, studio_name FROM studios'
        );
        return rows.map((row) => new Studio(row));
    }

    static async getStudioById() {
        const { rows } = await pool.query(
            'SELECT * from studios WHERE id = ($1)',
            [id]
        );
        return new Studio(rows[0]);
    }
};
