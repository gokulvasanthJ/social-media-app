const Chat = require('../models/Chat'); // Assuming we have a Chat model (details below)
const User = require('../models/User');

exports.getChatHistory = async (req, res) => {
    try {
        const { recipientId } = req.params;
        const messages = await Chat.find({
            $or: [
                { sender: req.user._id, recipient: recipientId },
                { sender: recipientId, recipient: req.user._id }
            ]
        }).sort({ createdAt: 1 }); // Sort by timestamp ascending
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve chat history" });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { recipientId, message } = req.body;
        const chatMessage = new Chat({
            sender: req.user._id,
            recipient: recipientId,
            message
        });
        await chatMessage.save();
        res.status(201).json(chatMessage);
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
};
