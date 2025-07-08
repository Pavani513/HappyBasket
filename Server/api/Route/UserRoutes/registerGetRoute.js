const express = require("express");
const User = require("../../Modal/User");
const router = express.Router();

// GET all users
router.get("/userGet", async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password hash
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

module.exports = router;
