const express = require('express');
const { getChatHistory, sendMessage } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:recipientId', authMiddleware, getChatHistory);
router.post('/', authMiddleware, sendMessage);

module.exports = router;
