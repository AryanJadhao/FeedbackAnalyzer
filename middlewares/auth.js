function requireLogin(req, res, next) {
    if (!req.session || !req.session.isAdmin) {
        return res.redirect('/login');
    }
    next();
}

module.exports = { requireLogin };
