const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const tweetSchema = new mongoose.Schema({
	tweets_home: {
		type: Array,
	},
	twitterId: {
		type: String,
		unique: true,
		trim: true		
	}
});

tweetSchema.plugin(mongodbErrorHandler);

module.exports = Tweets = mongoose.model('Tweets', tweetSchema);