const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const entry = await Film.create(req.body);
            res.send(entry);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const savedFilms = await Film.getAllFilms();
            res.send(savedFilms);
        } catch (error) {
            next(error);
        }
    });
