
# Smart Feedback Analyzer 🧠✨

A full-stack web application to collect user feedback and perform real-time sentiment analysis using Natural Language Processing (NLP).

🌐 **Live Demo**: [https://smart-feedback-analyzer.onrender.com/](https://smart-feedback-analyzer.onrender.com/)

---

## 📌 Features

- ✍️ Collect feedback from users through a simple form
- 🧠 Real-time sentiment classification (Positive / Neutral / Negative)
- 📊 Dashboard with pie chart and feedback stats
- 🔐 Admin login with session-based authentication
- 🗑️ Admin can view and delete feedback entries
- 📦 Backend REST APIs using Node.js and Express

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas + Mongoose
- **Authentication**: express-session
- **Sentiment Analysis**: [sentiment](https://www.npmjs.com/package/sentiment) NPM package (NLP-based)
- **Templating**: EJS
- **Frontend**: HTML, CSS, Bootstrap
- **Deployment**: Render

---

## 🚀 How It Works

1. Users submit feedback on the home page
2. NLP analyzes the sentiment using `sentiment` package
3. Feedback and sentiment are stored in MongoDB
4. Dashboard displays:
   - Total feedbacks
   - Pie chart of sentiment breakdown
5. Admin logs in to manage feedback entries

---

## 🔐 Admin Credentials

> Admin account is stored securely in MongoDB with hashed password.

If running locally, create an admin using a script or through manual insert.

---


## 📬 Contact

Made with 💻 by **Aryan Jadhao**  
📧 [aryanjadhao29@gmail.com](mailto:aryanjadhao29@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/aryan-jadhao-83b7a42a0/) | [GitHub](https://github.com/AryanJadhao)


