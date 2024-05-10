const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide full name'],
      maxlength: 50,
      minlength: 3,
    },
    username: {
      type: String,
      required: [true, 'Please provide username'],
      minlength: 5,
    },
    softwareName: {
      type: String,
      required: [true, 'Please provide software name'],
      minlength: 5,
    },
    expirationDate: {
      type: String,
      required: [true, 'Please provide expiration date'],
    },
    licenseKey: {
      type: String,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      require,
    },
    providerEmail: {
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

ProviderSchema.pre('save', function (next) {
  // Generate the license key before saving
  const firstTwoLettersOfName = this.softwareName.substring(0, 2);
  const firstTwoLettersOfSoftwareName = this.softwareName.substring(0, 2);

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

module.exports = mongoose.model('Provider', ProviderSchema);
