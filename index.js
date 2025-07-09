const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const adminRoutes = require('./routes/admin');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: 'smart-feedback-secret',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.get("/", (req, res) => {
  res.send("✅ Smart Feedback Analyzer backend live");
});

app.use("/feedback", feedbackRoutes);
app.use("/admin", adminRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); 
  });

process.on("unhandledRejection", err => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});
