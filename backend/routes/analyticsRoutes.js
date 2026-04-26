const express = require('express');
const router = express.Router();
const { 
  getSummary, 
  getWeeklyData, 
  getMonthlyData, 
  getHeatmapData,
  getCategoryBreakdown,
  getJournal
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/summary', getSummary);
router.get('/weekly', getWeeklyData);
router.get('/monthly', getMonthlyData);
router.get('/heatmap', getHeatmapData);
router.get('/categories', getCategoryBreakdown);
router.get('/journal', getJournal);

module.exports = router;
