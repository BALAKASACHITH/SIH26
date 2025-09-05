const express = require("express");
const User = require("../models/User");
const router = express.Router();
router.post("/auth", async (req, res) => {
    try {
        const { action, email, password } = req.body;
        if (!email || !password || !action) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (action === "signup") {
            const existing = await User.findOne({ email });
            if (existing) {
                return res.json({ message: "Email already registered" });
            }
            const user = new User({ email, password });
            await user.save();
            return res.status(201).json({ message: "User registered successfully", user });
        }
        if (action === "signin") {
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.json({ message: "Invalid credentials" });
            }
            return res.json({ message: "Login successful", user });
        }
        return res.status(400).json({ message: "Invalid action. Use signup or signin" });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
});

module.exports = router;
