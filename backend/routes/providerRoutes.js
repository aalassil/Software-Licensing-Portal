const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const providerController = require('../controllers/providerController');

// POST request to create a new provider
router.post('/addClient', authMiddleware, providerController.createProvider);
router.get('/viewClients', authMiddleware, providerController.getAllClient);
router.delete('/delete/:id', authMiddleware, providerController.deleteClient);
router.put('/update/:id', authMiddleware, providerController.updateProvider);
router.post('/sendMail', providerController.sendContactInfo);

module.exports = router;
