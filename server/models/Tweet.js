const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const tweetSchema = new mongoose.Schema({
	tweet: {
		type: Object
	}
});

tweetSchema.plugin(mongodbErrorHandler);

module.exports = Tweet = mongoose.model('Tweet', tweetSchema);