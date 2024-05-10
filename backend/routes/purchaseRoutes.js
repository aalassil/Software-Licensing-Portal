const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const purchaseController = require('../controllers/purchaseController');

// POST - Create a new purchase
router.post('/purchases', authMiddleware, purchaseController.createPurchase);
router.get(
  '/purchase-info',
  authMiddleware,
  purchaseController.getPurchaseInfo
);

module.exports = router;
