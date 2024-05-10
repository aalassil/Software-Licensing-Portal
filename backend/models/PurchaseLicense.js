const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema(
  {
    selectedSoftware: {
      type: String,
      required: [true, 'Please select the software'],
    },
    licenseTerm: {
      type: String,
      enum: ['1 Year', '2 Years', '3 Years'], // Add more options as needed
      required: [true, 'Please select the license term'],
    },
    quantity: {
      type: Number,
      default: 1,
      required: [true, 'Please specify the quantity'],
    },
    licenseKey: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      require,
    },
    userEmail: {
      type: String,
      require,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PurchaseSchema.pre('save', function (next) {
  // Generate the license key before saving
  const firstTwoLettersOfName = this.selectedSoftware.substring(0, 2);
  const firstTwoLettersOfSoftwareName = this.selectedSoftware.substring(0, 2);

  const characters = '1234567890';
  const charactersCount = 6;
  let randSerial = '';

  for (let i = 0; i < charactersCount; i++) {
    randSerial += characters[Math.floor(Math.random() * characters.length)];
  }

  this.licenseKey =
    firstTwoLettersOfName + randSerial + firstTwoLettersOfSoftwareName;

  next();
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;
