const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render("admin-login", { error: null, session: req.session });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.render('admin-login', { error: "Invalid credentials" });
  }

  req.session.isAdmin = true;
  req.session.adminEmail = admin.email;

  res.redirect('/feedback');
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.redirect('/admin/login');
  });
});


module.exports = router;
