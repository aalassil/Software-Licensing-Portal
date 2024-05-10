const UserFeedback = require('../models/userFeedback');

const saveFeedback = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    const newFeedback = new UserFeedback({
      name,
      phone,
      email,
      subject,
      message,
    });

    await newFeedback.save();

    res.status(201).json({
      message: 'Feedback saved successfully',
      feedback: newFeedback,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  saveFeedback,
};
