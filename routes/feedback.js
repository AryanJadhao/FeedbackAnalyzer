const { Router } = require('express');
const Feedback = require("../models/Feedback");
const { requireLogin } = require('../middlewares/auth');

function analyzeSentiment(text) {
  const positiveWords = ["good", "great", "awesome", "excellent", "happy", "best"];
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

router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    const total = feedbacks.length;
    const stats = { positive: 0, neutral: 0, negative: 0 };

    feedbacks.forEach(fb => {
      stats[fb.sentiment]++;
    });

    res.render("dashboard", { total, stats, session: req.session });
  } catch (err) {
    res.status(500).send("Error loading dashboard");
  }
});


router.get("/feedback", (req, res) => {
  res.render("feedback", { session: req.session });
});

router.post("/submit-feedback", async (req, res) => {
  const { name, message } = req.body;

  const sentiment = analyzeSentiment(message);

  const feedback = await Feedback.create({
    name,
    message,
    sentiment
  });

  res.render('thankyou', { session: req.session });
});

router.get('/thankyou', (req, res) => {
  res.render('thankyou', { session: req.session });
});

router.get('/all-feedback', async (req, res) => {
  const { name } = req.query;
  try {
    const query = name ? { name: new RegExp(name, 'i') } : {};
    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });

    const message = req.session.message || null;
    req.session.message = null;

    res.render("all-feedback", { feedbacks, message, session: req.session });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch feedbacks' });
  }
});

router.post("/delete-feedback/:id", async (req, res) => {
  if (!req.session.isAdmin) {
    req.session.message = "Unauthorized action";
    return res.redirect("/all-feedback");
  }
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    req.session.message = "Feedback deleted successfully!";
    res.redirect("/all-feedback");
  } catch (err) {
    res.status(500).send("Error deleting feedback");
  }
});

module.exports = router;
