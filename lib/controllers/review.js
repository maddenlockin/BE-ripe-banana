const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const entry = await Review.create(req.body);
            res.send(entry);
        } catch (error) {
            next(error);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const savedReviews = await Review.getAllReviews();
            res.send(savedReviews);
        } catch (error) {
            next(error);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.reviewId;
            const deleteRev = await Review.delete(id);
            res.send(deleteRev);
            console.log(deleteRev);
        } catch(error){
            next(error);
        }
  })

;