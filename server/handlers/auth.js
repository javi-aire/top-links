// TODO rename file lol
const User = require('../models/User');
const mongoose = require('mongoose');
const Tweets = mongoose.model('Tweets');
const OAuth = require('oauth');

exports.getHomeTimeline = async (req, res, next) => {
	let { user_token, user_secret } = await User.findOne({ twitterId: req.params.id});
	
	const oauth = new OAuth.OAuth(
		user_token,
		user_secret,
		process.env.KEY,
		process.env.SECRET,
		'1.0A',
		null,
		'HMAC-SHA1'
	);
	oauth.get('https://api.twitter.com/1.1/statuses/home_timeline.json', user_token, user_secret, 
		function(e, data, resp) { 
			Tweets.findOne({ twitterId: req.params.id },
				function(err, tweets) {
					if (err) return err;

					if(!tweets){
						tweets = new Tweets({
							twitterId: req.params.id,
							tweets_home: data
						});
						tweets.save(function(err) {
							if (err) console.error(err)
							return;
						})	
					} else {
						return;
					}
				}
			)
			if(e) console.error(e);
			data = JSON.parse(data);
			res.json(data);
		}
	);
};
