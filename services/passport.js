const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); //User is our model class

passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accesToken, refreshtoken, profile, done) => {//this function will fire once the user has been redirect to callbackURL
    //this function is our opportunity to now take this identifying user information and save it to our data base
    new User({ googleId: profile.id }).save() //.save() save the instance in mongoDB
}));//create a new instance of google oauth
