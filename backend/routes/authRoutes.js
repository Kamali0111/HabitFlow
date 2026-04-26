const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser, loginUser, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  registerUser
);

router.post('/login', loginUser);

router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
