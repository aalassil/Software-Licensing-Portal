const Purchase = require('../models/PurchaseLicense');

const createPurchase = async (req, res) => {
  try {
    const { selectedSoftware, licenseTerm, quantity } = req.body;

    const userId = req.user._id;
    const userEmail = req.user.email;

    if (req.user.role !== 'client') {
      return res.status(401).json({
        message: 'Unauthorized Access',
      });
    }
    const newPurchase = new Purchase({
      selectedSoftware,
      licenseTerm,
      quantity,
      userId: userId,
      userEmail,
    });

    await newPurchase.save();

    return res.status(201).json({
      message: 'Purchase created successfully',
      purchase: newPurchase,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ error: error.message });
  }
};

const getPurchaseInfo = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.role !== 'client') {
      return res.status(401).json({
        message: 'Unauthorized Access',
      });
    }

    // Find purchases associated with the logged-in user
    const purchases = await Purchase.find({ userId }); // Filter by userId

    return res.status(200).json({
      message: 'Purchase information retrieved successfully',
      purchases,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPurchase,
  getPurchaseInfo,
};
