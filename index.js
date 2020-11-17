const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const billingRoute = require('./routes/billingRoute');
const surveyRoute = require('./routes/surveyRoute');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');//library to help us to handlel cookies
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport');
const app = express(); //Generate a new express aplication
app.use(bodyParser.json());//this middleware parse incoming bodies in a middleware before your handlers, avaliable under the req.body property
app.use(//middle ware
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //maxAge is how log this cookie can exist in the browser before it's automatically expired(30 were set, but has to be passed in miliseconds)
        keys: [keys.cookieKey]
    })
);

//we are telling passport that need to use cookies to handle sessions
app.use(passport.initialize());
app.use(passport.session());
authRoute(app);
billingRoute(app);
surveyRoute(app);

//Routing in PRODUCTION
//this is sending the build files created in the client directory when I hit npm run build
if (process.env.NODE_ENV === 'production') {
    //Express will serve up production assets
    //like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    //if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

mongoose.connect(keys.mongoURI);//connecting to the data base mongoDB
const PORT = process.env.PORT || 5000; //If there an environment variable that has been already defined by heroku then used, IFNOT use port 5000
//so in development environment we're listenig in port 5000 and in producction we're listening in wherever port heroku set to us
app.listen(PORT, () => console.log('server listenig'));
