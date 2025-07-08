const express = require("express");
const User = require("../../Modal/User");
const router = express.Router();

// PUT update user by ID
router.put("/userPut/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email },
            { new: true, runValidators: true }
        ).select("-password"); // Exclude password hash

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});

module.exports = router;
