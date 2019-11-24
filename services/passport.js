const passport = require('passport');
const Googlestrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const  keys = require('../config/keys');


const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Function chuyen user id thanh user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new Googlestrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });
        
                if (existingUser) {
                    //da co id trong db
                    return done(null, existingUser);
                } else {
                    //chua co id trong db
                 const user = await new User({ googleId: profile.id}).save();
                    done(null, user);
                }

            }

        
    )
);
