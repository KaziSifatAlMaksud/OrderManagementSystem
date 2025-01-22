const express = require('express');
const {
    httpAddNewPromotion,
    httpGetAllPromotions,
    httpGetPromotionById,
    httpUpdatePromotion,
    httpDeletePromotion,
    httpUpdatePromotionStatus,
} = require('./promotion.controller');

const promotionsRouter = express.Router();

promotionsRouter.get('/', httpGetAllPromotions);
promotionsRouter.get('/:id', httpGetPromotionById);
promotionsRouter.post('/', httpAddNewPromotion);
promotionsRouter.put('/:id', httpUpdatePromotion);
promotionsRouter.delete('/:id', httpDeletePromotion);
promotionsRouter.put('/action/:id', httpUpdatePromotionStatus);

module.exports = promotionsRouter; 