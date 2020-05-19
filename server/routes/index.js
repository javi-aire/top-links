const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../handlers/auth');

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
	passport.authenticate('twitter', { failureRedirect: '/login '}), 
	(req, res, next) => {
		res.redirect(`/timeline/${req.user.id}`);
	}
);

router.get('/timeline/:id', auth.getHomeTimeline)

module.exports = router;