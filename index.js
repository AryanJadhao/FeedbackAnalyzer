const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const adminRoutes = require('./routes/admin');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3000;

// Improved MongoDB connection
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
  connectWithRetry();
});


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: 'smart-feedback-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.get('/health', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    return res.status(200).json({ status: 'healthy', db: 'connected' });
  }
  res.status(500).json({ status: 'unhealthy', db: 'disconnected' });
});

app.use("/", feedbackRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).render('404');
});

const server = app.listen(PORT, () => {
  console.log("✅ PORT from env:", process.env.PORT);
  console.log(`Server running at port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close(false)
      .then(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
      })
      .catch(err => {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      });

  });
});