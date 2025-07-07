const { Schema, model } = require('mongoose');

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  }
}, {
  timestamps: true 
});


module.exports = model("Feedback", feedbackSchema);
