const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const expressValidator = require('express-validator');
const appRoutes = require('./routes/index');
const cors = require('cors');
const passport = require('passport');
require('./handlers/passport');

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: process.env.SESSION_SECRET,
	key: process.env.SESSION_KEY,
	resave: false,
	saveUnitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', appRoutes);

module.exports = app;