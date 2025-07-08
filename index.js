const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const adminRoutes = require('./routes/admin');

const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: 'smart-feedback-secret',
  resave: false,
  saveUninitialized: true
}))

app.use("/", feedbackRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
