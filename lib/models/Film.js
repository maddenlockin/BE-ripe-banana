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

    static async getAllFilms() {
        const result = await pool.query(
            'SELECT film_id, title, released FROM films'
        );
        const moviesArray = await result.rows.map((row) => row);

        console.log('OOOOO', moviesArray);
        const { rows } = await pool.query(
            'SELECT studio_id, studio_name FROM films INNER JOIN studios ON studios.id = films.studio_id'
        );
        console.log('9999999', rows);
        const moviesObject = await moviesArray.map(
            row
            // => { // for each row we need to create a new film object which contains the film details plus the associated film studio
            // we also need the studio to be the correct one
            // we need to initialize the object that we want to create
            // the first thing we need to add to the object is ... the filmId
            // the next thing is the studio object

            //     return { ...row, studio: rows };
            // });
            // console.log(moviesObject);
            // }
            // return [{
            //     ...moviesArray,
            //     studio: rows,
            // }];
            // return rows.map(() => {
            //     ...film,
            //     Studios: rows,
            // });
        );
    }
};
