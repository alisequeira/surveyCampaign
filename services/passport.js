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

    User.findOne({ googleId: profile.id })//return a promise
        .then((existingUser) => {
            if (existingUser) {
                //we already have a record with the given id
                done(null, existingUser);//done indicate to passport that we are finished and may continue with the workflow
            } else {
                //we don't have a user record with this id, make a new record
                new User({ googleId: profile.id }).save() //.save() save the instance in mongoDB
                    .then(user => done(null, user));
            }
        });
}));//create a new instance of google oauth
