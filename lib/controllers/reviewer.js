const { Router } = require('express');
const Reviewer = require('../models/Reviewer.js');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const entry = await Reviewer.create(req.body);
            res.send(entry);
        } catch (err) {
            next(err);
        }
    })
;