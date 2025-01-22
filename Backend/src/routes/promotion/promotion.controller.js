const {
    getPromotions,
    postPromotion,
    getPromotionById,
    deletePromotion,
    updatePromotion,
    updatePromotionStatus,
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



// PUT (update) a promotion status by ID
async function httpUpdatePromotionStatus(req, res) {
    const promotionId = req.params.id;
    const { status } = req.body;
    if (status === undefined) {
        return res.status(400).json({ error: "Missing required field: status" });
    }
    try {
        const updatedPromotion = await updatePromotionStatus(promotionId, status);
        console.log("Updated promotion:", updatedPromotion);

        if (updatedPromotion) {
            return res.status(200).json({ message: "Promotion status updated successfully" });
        } else {
            // If no rows were affected, return promotion not found error
            return res.status(404).json({ error: "Promotion not found" });
        }
    } catch (error) {
        console.error("Error updating promotion status:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



// POST a new promotion
async function httpAddNewPromotion(req, res) {
    const { title, start_date, end_date, promotion_type, discount, products } = req.body;

    // Check for missing required fields or products
    if (!title || !start_date || !end_date || !promotion_type || !discount || !products || !products.length) {
        return res.status(400).json({ error: "Missing required fields or products" });
    }
    const promotion = {
        title,
        start_date,
        end_date,
        promotion_type,
        discount,
        products,
    };

    try {
        const newPromotion = await postPromotion(promotion);
        return res.status(201).json({
            message: "Promotion created successfully, with products!",
            promotion: newPromotion,
        });

    } catch (error) {
        console.error("Error creating promotion:", error);
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
    httpUpdatePromotionStatus,
};
