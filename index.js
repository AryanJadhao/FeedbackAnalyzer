const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = 8001;

mongoose.connect("mongodb://localhost:27017/feedbackDB")
    .then(() => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", feedbackRoutes);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
