function isLoggedIn(req, res, next) {
	if (req.session.currentUser) {
		next();
	} else {
		res.redirect('/user/profile');
	}
}

module.exports = isLoggedIn;
