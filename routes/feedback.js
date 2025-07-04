const { Router } = require('express');
const Feedback = require("../models/Feedback");

function analyzeSentiment(text) {
    const positiveWords = ["good", "great", "awesome", "excellent", "happy"];
    const negativeWords = ["bad", "terrible", "worst", "sad", "poor"];

    let score = 0;
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];

    words.forEach(word => {
        if (positiveWords.includes(word)) score++;
        if (negativeWords.includes(word)) score--;
    });

    return score > 0 ? "positive" : score < 0 ? "negative" : "neutral";
}


const router = Router();

router.get("/", (req, res) => {
    res.render("feedback");
});

router.post("/submit-feedback", async (req, res) => {
  const { name, message } = req.body;

  const sentiment = analyzeSentiment(message);

  const feedback = await Feedback.create({
    name,
    message,
    sentiment
  });

  res.status(201).json({
    message: "Feedback submitted successfully",
    feedback
  });
});


router.get('/all-feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch feedbacks' });
  }
});


module.exports = router;
