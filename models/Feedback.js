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
  }
}, {
  timestamps: true 
});


module.exports = model("Feedback", feedbackSchema);
