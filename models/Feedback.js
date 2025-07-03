const { Schema, model } = require('mongoose');

const feedbackSchema = new Schema({
  name: String,
  message: String,
  sentiment: String,
},
 { timestamps: true }
);

module.exports = model("Feedback", feedbackSchema);
