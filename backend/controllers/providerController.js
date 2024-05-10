const Provider = require('../models/provider');
const nodemailer = require('nodemailer');

const createProvider = async (req, res) => {
  try {
    const { fullName, username, softwareName, expirationDate } = req.body;

    const providerId = req.user._id;
    const providerEmail = req.user.email;

    if (req.user.role !== 'provider') {
      return res.status(401).json({
        message: 'Unauthorized Access',
      });
    }

    const newProvider = new Provider({
      fullName,
      username,
      softwareName,
      expirationDate,
      providerId,
      providerEmail,
    });

    await newProvider.save();

    res.status(201).json({
      message: 'Provider created successfully',
      provider: newProvider,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllClient = async (req, res) => {
  const providerId = req.user._id;

  if (req.user.role !== 'provider') {
    return res.status(401).json({
      message: 'Unauthorized Access',
    });
  }

  try {
    // Fetch providers based on the providerId
    const providers = await Provider.find({ providerId });

    return res.status(200).json({
      message: 'Providers retrieved successfully',
      providers,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(401).json({
        message: 'Unauthorized Access',
      });
    }

    const clientId = req.params.id;

    const clientToDelete = await Provider.findById(clientId);

    if (!clientToDelete) {
      return res.status(404).json({
        message: 'Client not found',
      });
    }

    if (clientToDelete.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Unauthorized to delete this client',
      });
    }

    await Provider.findByIdAndDelete(clientId);

    res.status(200).json({
      message: 'Client deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProvider = async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(401).json({
        message: 'Unauthorized Access',
      });
    }

    const providerId = req.params.id;

    const providerToUpdate = await Provider.findById(providerId);

    if (!providerToUpdate) {
      return res.status(404).json({
        message: 'Provider not found',
      });
    }

    if (providerToUpdate.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Unauthorized to update this provider',
      });
    }

    providerToUpdate.fullName = req.body.fullName || providerToUpdate.fullName;
    providerToUpdate.username = req.body.username || providerToUpdate.username;
    providerToUpdate.softwareName =
      req.body.softwareName || providerToUpdate.softwareName;
    providerToUpdate.expirationDate =
      req.body.expirationDate || providerToUpdate.expirationDate;

    await providerToUpdate.save();

    res.status(200).json({
      message: 'Provider updated successfully',
      provider: providerToUpdate,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const sendContactInfo = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'canadastudy725@gmail.com',
        pass: 'iysyjcaekonmqtzb',
      },
    });

    const mailOptions = {
      from: 'candastudy725@gmail.com',
      to: `${email}`,
      subject: `New Contact Form Submission: ${subject}`,
      text: `Hi! I am ${name}. ${message}. If you have any queries please contact on ${phone}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProvider,
  getAllClient,
  deleteClient,
  updateProvider,
  sendContactInfo,
};
