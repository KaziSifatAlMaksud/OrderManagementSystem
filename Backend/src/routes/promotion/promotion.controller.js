const {
    getPromotions,
    postPromotion,
    getPromotionById,
    deletePromotion,
    updatePromotion,
} = require("../../models/promotion.model");

// GET all promotions
async function httpGetAllPromotions(req, res) {
    return res.status(200).json(await getPromotions());
}

// GET Promotion by ID
async function httpGetPromotionById(req, res) {
    const promotionId = req.params.id;
    try {
        const promotion = await getPromotionById(promotionId);
        if (!promotion) {
            return res.status(404).json({ error: "Promotion not found" });
        }
        return res.status(200).json(promotion);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching promotion" });
    }
}

// POST a new promotion
async function httpAddNewPromotion(req, res) {
    const { title, start_date, end_date, promotion_type, discount, weight_id } = req.body;

    if (!title || !start_date || !end_date || !promotion_type || !discount) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const promotion = {
        title,
        start_date,
        end_date,
        promotion_type,
        discount,
        weight_id,
    };

    try {
        const newPromotion = await postPromotion(promotion);
        return res.status(201).json(newPromotion);
    } catch (error) {
        return res.status(500).json({ error: "Error creating promotion" });
    }
}

// DELETE a promotion by ID
async function httpDeletePromotion(req, res) {
    const promotionId = req.params.id;

    try {
        const deletedPromotion = await deletePromotion(promotionId);
        if (!deletedPromotion) {
            return res.status(404).json({ error: "Promotion not found" });
        }
        return res.status(200).json({ message: "Promotion deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting promotion" });
    }
}

// PUT (update) a promotion by ID
async function httpUpdatePromotion(req, res) {
    const promotionId = req.params.id;
    const { title, start_date, end_date, promotion_type, discount, weight_id } = req.body;

    if (!title || !start_date || !end_date || !promotion_type || !discount) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedPromotion = {
        title,
        start_date,
        end_date,
        promotion_type,
        discount,
        weight_id,
    };

    try {
        const promotion = await updatePromotion(promotionId, updatedPromotion);
        if (!promotion) {
            return res.status(404).json({ error: "Promotion not found" });
        }
        return res.status(200).json(promotion);
    } catch (error) {
        return res.status(500).json({ error: "Error updating promotion" });
    }
}

module.exports = {
    httpGetAllPromotions,
    httpAddNewPromotion,
    httpGetPromotionById,
    httpDeletePromotion,
    httpUpdatePromotion,
};
