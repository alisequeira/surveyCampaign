const express = require('express');
require('./services/passport');
const authRoute = require('./routes/authRoute');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
const app = express(); //Generate a new express aplication

authRoute(app);
mongoose.connect(keys.mongoURI);
const PORT = process.env.PORT || 5000; //If there an environment variable that has been already defined by heroku then used, IFNOT use port 5000
//so in development environment we're listenig in port 5000 and in producction we're listening in wherever port heroku set to us
app.listen(PORT, () => console.log('server listenig'));
