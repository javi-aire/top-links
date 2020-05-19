const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose')
const User = mongoose.model('User');
const auth = require('../handlers/auth');

passport.use(new Strategy({
	consumerKey: process.env.KEY,
	consumerSecret: process.env.SECRET,
	callbackURL: 'http://localhost:3005/auth/twitter/callback'
	},
	function(token, tokenSecret, profile, cb) {
		User.findOne({ twitterId: profile.id },
			function(err, user) {
				if(err) return cb(err);		

				if(!user) {
					user = new User({
						twitterId: profile.id,
						user_token: token,
						user_secret: tokenSecret
					});
					user.save(function(err) {
						if(err) console.log(err);
						return cb(err, user);
					})
				} else {
					return cb(err, user);
				}
			}
		);

		// pass token/token secret to 
		return cb(null, profile);
	}
));