const express = require('express');
const {
    httpAddNewPromotion,
    httpGetAllPromotions,
    httpGetPromotionById,
    httpUpdatePromotion,
    httpDeletePromotion,
} = require('./promotion.controller');

const promotionsRouter = express.Router();

// Route to get all promotions
promotionsRouter.get('/', httpGetAllPromotions);

// Route to get a promotion by ID
promotionsRouter.get('/:id', httpGetPromotionById);

// Route to create a new promotion
promotionsRouter.post('/', httpAddNewPromotion);

// Route to update a promotion by ID
promotionsRouter.put('/:id', httpUpdatePromotion);

// Route to delete a promotion by ID
promotionsRouter.delete('/:id', httpDeletePromotion);

module.exports = promotionsRouter;