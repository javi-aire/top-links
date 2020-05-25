const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const expressValidator = require('express-validator');
const authRoutes = require('./routes/index');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const User = require('./models/User');
require('./handlers/passport');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.use(cors({
	origin: "http://localhost:3000",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true
}));

app.use(cookieSession({
	name: "session",
	keys: [process.env.SESSION_SECRET, process.env.SESSION_KEY],
	maxAge: 24 * 60 * 60 * 100 // 24 hours
}));

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

app.use('/auth', authRoutes);

const authCheck = (req, res, next) => {
	if(!req.user){
		res.status(401).json({
			authenticated: false,
			message: 'user has not been authorized'
		});
	} else {
		next();
	}
}

app.use('/', authCheck, (req, res) => {
	res.status(200).json({
		authenitcated: true,
		message: "user successfully authenticated",
		user: req.user,
		cookies: req.cookies
	})
})

module.exports = app;