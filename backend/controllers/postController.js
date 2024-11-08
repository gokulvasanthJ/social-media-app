const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const post = new Post({ user: req.user._id, content: req.body.content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: "Post creation failed" });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: req.user._id } },
            { new: true }
        );
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Liking post failed" });
    }
};
