const Purchase = require('../models/PurchaseLicense');

const renewLicense = async (req, res) => {
  try {
    const { licenseKey, renewalTerm } = req.body;

    // Find the purchase by the provided license key
    console.log('req.body', req.body);
    const purchase = await Purchase.findOne({ licenseKey });

    if (req.user.role !== 'client') {
      return res.status(401).json({
        message: 'Unauthorized Access',
      });
    }

    if (!purchase) {
      return res.status(404).json({ error: 'License key not found' });
    }

    // Update the license term based on renewal term input
    purchase.licenseTerm = renewalTerm;

    // Save the updated purchase
    await purchase.save();

    return res.status(200).json({
      message: 'License renewed successfully',
      updatedPurchase: purchase,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  renewLicense,
};
