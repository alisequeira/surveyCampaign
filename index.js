const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express(); //Generate a new express aplication

passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/calback'
}, (accesToken) => {
    console.log(accesToken);
})
);//create a new instance of google oauth

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'] //optional object that we passed in scope, scope specify to google servers what kind of access we want to have inside of this
}));
const PORT = process.env.PORT || 5000; //If there an environment variable that has been already defined by heroku then used, IFNOT use port 5000
//so in development environment we're listenig in port 5000 and in producction we're listening in wherever port heroku set to us
app.listen(PORT, () => console.log('server listenig'));
