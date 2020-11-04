const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express(); //Generate a new express aplication

passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accesToken, refreshtoken, profile, done) => {//this function will fire once the user has been redirect to callbackURL
    //this function is our opportunity to now take this identifying user information and save it to our data base
    console.log('accesToken: ', accesToken);
    console.log('refresh token: ', refreshtoken);
    console.log('profile: ', profile);
})
);//create a new instance of google oauth

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'] //optional object that we passed in scope, scope specify to google servers what kind of access we want to have inside of this
}));

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000; //If there an environment variable that has been already defined by heroku then used, IFNOT use port 5000
//so in development environment we're listenig in port 5000 and in producction we're listening in wherever port heroku set to us
app.listen(PORT, () => console.log('server listenig'));
