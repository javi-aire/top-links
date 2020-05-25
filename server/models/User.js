const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new mongoose.Schema({
	twitterId: {
		type: String,
		unique: true,
		trim: true
	},
	user_token: {
		type: String,
		unique: true
	},
	user_secret: {
		type: String,
		unique: true
	}
});

userSchema.plugin(mongodbErrorHandler);

module.exports = User = mongoose.model('User', userSchema);