const express = require("express");
const User = require("../../Modal/User");
const router = express.Router();

// GET user by ID
router.get("/userGet/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password"); // Exclude password hash

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
});

module.exports = router;
