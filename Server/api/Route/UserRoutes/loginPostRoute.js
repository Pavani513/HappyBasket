const express = require("express");
const User = require("../../Modal/User");
const router = express.Router();

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const { password: _, ...userWithoutPassword } = user._doc;

        res.status(200).json({ message: "Login successful", user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
