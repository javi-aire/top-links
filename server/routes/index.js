const express = require('express');
const router = express.Router();
const passport = require('passport');
const fetch = require('node-fetch');
const auth = require('../handlers/auth');
const Tweet = require('../models/Tweet');

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
	passport.authenticate('twitter', { failureRedirect: '/login '}), 
	(req, res, next) => {
		// res.send(homeTimeline);
		res.redirect(`/timeline/${req.user.id}`);
	}
);

router.get('/timeline/:id', auth.getHomeTimeline)

module.exports = router;