const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../handlers/auth');
const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/redirect',
	passport.authenticate('twitter', { 
		successRedirect: CLIENT_HOME_PAGE_URL,
		failureRedirect: '/auth/login/failed'
	})
);

router.get('/login/success', ({ user, cookies }, res) => {
	if(user){
		res.json({
			success: true,
			message: "User successfully authenticated",
			user,
			cookies 
		});
	} 
});

// router.get('/timeline/:id', auth.getHomeTimeline)

module.exports = router;