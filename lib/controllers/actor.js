const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const entry = await Actor.create(req.body);
            res.send(entry);
        } catch (error) {
            next(error);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const savedActors = await Actor.getAllActors();
            res.send(savedActors);
        } catch (error) {
            next(error);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const actor = await Actor.getActorById(id);
            res.send(actor);
        } catch (error) {
            next(error);
        }
    });
