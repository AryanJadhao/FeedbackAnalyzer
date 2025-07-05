const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('admin-login', { error: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.render('admin-login', { error: "Invalid credentials" });
  }

  req.session.isAdmin = true;
  req.session.adminEmail = admin.email;

  res.redirect('/all-feedback');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
