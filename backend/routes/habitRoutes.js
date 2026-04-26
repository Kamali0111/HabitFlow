const express = require('express');
const router = express.Router();
const { 
  getHabits, 
  createHabit, 
  updateHabit, 
  deleteHabit, 
  completeHabit, 
  freezeHabit 
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getHabits)
  .post(createHabit);

router.route('/:id')
  .put(updateHabit)
  .delete(deleteHabit);

router.post('/:id/complete', completeHabit);
router.post('/:id/freeze', freezeHabit);

module.exports = router;
