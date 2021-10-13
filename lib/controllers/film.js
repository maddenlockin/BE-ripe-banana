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
    })

    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const getFilmsById = await Film.getFilmsById(id);
            res.send(getFilmsById);
        } catch (error) {
            next(error);
        }
    });
