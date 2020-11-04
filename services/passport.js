const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accesToken, refreshtoken, profile, done) => {//this function will fire once the user has been redirect to callbackURL
    //this function is our opportunity to now take this identifying user information and save it to our data base
    console.log('accesToken: ', accesToken);
    console.log('refresh token: ', refreshtoken);
    console.log('profile: ', profile);
}));//create a new instance of google oauth
