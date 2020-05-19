const mongoose = require('mongoose');

// import environment variables
require('dotenv').config({ path: 'variables.env' });

mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.err(err));
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import models
// Tweet
require('./models/Tweet');
// User
require('./models/User');

// start app
const app = require('./app');
app.set('port', process.env.PORT || 3005);
const server = app.listen(app.get('port'), () => {
	console.log(`Express listening on port ${server.address().port}`);
})

