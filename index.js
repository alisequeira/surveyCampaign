const express = require('express');
const authRoute = require('./routes/authRoute');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');//library to help us to handlel cookies
const passport = require('passport');
require('./models/User');
require('./services/passport');
const app = express(); //Generate a new express aplication
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //maxAge is how log this cookie can exist in the browser before it's automatically expired(30 were set, but has to be passed in miliseconds)
        keys: [keys.cookieKey]
    })
);

//we are telling passport that need to use cookies to handle sessions
app.use(passport.initialize());
app.use(passport.session());
authRoute(app);
mongoose.connect(keys.mongoURI);
const PORT = process.env.PORT || 5000; //If there an environment variable that has been already defined by heroku then used, IFNOT use port 5000
//so in development environment we're listenig in port 5000 and in producction we're listening in wherever port heroku set to us
app.listen(PORT, () => console.log('server listenig'));
