const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 });
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
});
router.post("/create", async (req, res) => {
    try {
        const { email, description } = req.body;
        if (!email || !description) {
            return res.status(400).json({ message: "Email and description are required" });
        }
        const newPost = new Post({ email, description });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
});
router.delete("/delete", async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedPost = await Post.findByIdAndDelete(_id);
        res.json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Error deleting post", error: error.message });
    }
});
module.exports = router;