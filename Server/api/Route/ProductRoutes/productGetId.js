const express = require("express");
const Data = require("../../Modal/Products");
const router = express.Router();

router.get('/userGet/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Data.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
