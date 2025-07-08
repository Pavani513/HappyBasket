const express = require("express");
const User = require("../../Modal/User");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        const newUser = new User({
            username,
            email,
            password,
        });
        newUser.confirmPassword = confirmPassword;

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
