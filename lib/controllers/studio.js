const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const entry = await Studio.create(req.body);
            res.send(entry);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const savedStudios = await Studio.getAllStudios();
            res.send(savedStudios);
        } catch (error) {
            next(error);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const studio = await Studio.getStudioById(id);
            res.send(studio);
        } catch (error) {
            next(error);
        }
    });
