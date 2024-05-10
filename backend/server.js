require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const renewLicense = require('./routes/renewRoutes');
const provider = require('./routes/providerRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const connectDB = require('./db/connect');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is listineing',
  });
});
app.use('/api', userRoutes);
app.use('/api', purchaseRoutes);
app.use('/api', renewLicense);
app.use('/api', provider);
app.use('/api', feedbackRoutes);

const port = 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
