const { Router } = require('express');
const Feedback = require("../models/Feedback");

function analyzeSentiment(text) {
    const positiveWords = ["good", "great", "awesome", "excellent", "happy"];
    const negativeWords = ["bad", "terrible", "worst", "sad", "poor"];

    let score = 0;

    text.toLowerCase().split(/\W+/).forEach(word => { 
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

    await Feedback.create({
        name,
        message,
        sentiment: "pending"
    });

    const sentiment = analyzeSentiment(message);

    await Feedback.create({
        name,
        message,
        sentiment
    });

    res.send("Feedback submitted!");
});

router.get("/all-feedback", async (req, res) => {
    const allFeedback = await Feedback.find({});
    res.render("all-feedback", { feedbacks: allFeedback });
});


module.exports = router;
