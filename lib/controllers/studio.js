const { Router } = require ('express');
const Studio = require ('../models/Studio');


module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const entry = await Studio.create(req.body);
            res.send(entry);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async(req, res, next) => {
        try {
            const savedStudios = await Studio.getAllStudios();
            res.send(savedStudios);
        } catch (error) {
            next(error);
        }
    })
;
