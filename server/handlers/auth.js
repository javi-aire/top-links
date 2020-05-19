const User = require('../models/User');
const fetch = require('node-fetch');
const OAuth = require('oauth');
const passport = require('passport');


exports.getAccessToken = async (req, res, next) => {
	// uses the tokens from req.query
	// to make a POST request to https://api.twitter.com/oauth/access_token
	const { oauth_token, oauth_verifier } = req.query;


	let accessToken = await fetch(`https://api.twitter.com/oauth/access_token?oauth_consumer_key=${tokenParams.oauth_consumer_key}&oauth_token=${tokenParams.oauth_token}&oauth_verifier=${tokenParams.oauth_verifier}`, {
		mode: 'POST'
	});
	// let response = await accessToken.json();
	// console.log('response:', accessToken);
	next();
};


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
			if(e) console.error(e);
			data = JSON.parse(data);
			res.json(data);
		}
	);

	// res.send(`<h1>Hello World!</h1>`);
};