const express = require("express");
const User = require("../../Modal/User");
const router = express.Router();

// Register User
router.post("/userPost", async (req, res) => {
    try {
        const { username, email, password } = req.body;


        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Create and save user
        const newUser = new User({
            username,
            email,
            password,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
