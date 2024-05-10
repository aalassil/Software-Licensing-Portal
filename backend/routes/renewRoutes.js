const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const renewController = require('../controllers/renewController');

// POST - Renew a license
router.post('/renew-license', authMiddleware, renewController.renewLicense);

module.exports = router;
