const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['+', '-'],
  },
  category: {
    type: 'String',
    required: true,
    enum: [
      'Food',
      'Rent',
      'Travel',
      'Shopping',
      'Books',
      'Tuition',
      'Stationery',
      'Internet',
      'Mobile Recharge',
      'Snacks',
      'Medical',
      'Events',
      'Gym',
      'Subscriptions', // like Netflix, Spotify
      'Transport', // Bus, bike, fuel
      'Laundry',
      'Others',
    ],
  },
  Amount: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
