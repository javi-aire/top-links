const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose')
const User = mongoose.model('User');
const auth = require('../handlers/auth');


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	User.findOne({ twitterId: user.twitterId })
		.then(user => {
			done(null, user);
		})
		.catch(e => {
			done(new Error('Failed to deserialize user'));
		});
});


const responseCallback = async (token, tokenSecret, profile, done) => {
	const currentUser = await User.findOne({
		twitterId: profile._json.id_str
	});

	if(!currentUser) {
		const newUser = await new User({
			twitterId: profile.id,
			user_token: token,
			user_secret : tokenSecret
		}).save();

		done(null, newUser);
	}

	done(null, currentUser);
}

passport.use(new Strategy({
	consumerKey: process.env.KEY,
	consumerSecret: process.env.SECRET,
	callbackURL: 'http://localhost:3005/auth/twitter/redirect'
	},
	responseCallback
));