const express = require('express');
const router = express.Router();
const userFeedbackController = require('../controllers/userFeedbackController');

router.post('/save-feedback', userFeedbackController.saveFeedback);

module.exports = router;
