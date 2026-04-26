const express = require('express');
const router = express.Router();
const { getSuggestions } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.get('/suggestions', protect, getSuggestions);

module.exports = router;
