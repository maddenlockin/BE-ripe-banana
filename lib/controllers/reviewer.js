const { Router } = require('express');
const Reviewer = require('../models/Reviewer.js');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const entry = await Reviewer.create(req.body);
            res.send(entry);
        } catch (error) {
            next(error);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const savedReviewer = await Reviewer.getAllReviewers();
            res.send(savedReviewer);
        } catch (error) {
            next(error);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.reviewerId;
            const reviewer = await Reviews.getReviewerById(id);
            res.send(reviewer);
        } catch (error) {
            next(error);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const id = req.params.reviewerId;
            const update = req.body;
            const updateRev = await Reviewer.update({ id, ...update });
            res.send(updateRev);
        } catch (error) {
            next(error);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const deleteRev = await Reviewer.delete(id);
            res.send(deleteRev);
    } catch(error){
      next(error);
    }
  })
;