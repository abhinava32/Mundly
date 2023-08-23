const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const user = require('../models/users');
const env = require('./environment');

passport.use(new googleStrategy({
        clientID: env.clientID,
        clientSecret: env.clientSecret, //deleted G in front for testing
        callbackURL: env.callbackURL,
    },  
       async function(accessToken, refreshToken, profile, done){
            // console.log("finding user");
            var User = await user.findOne({email: profile.emails[0].value});
            // console.log(profile);
            if(User){
                
                return done(null, User);
            }
            else{
                
                User = await user.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    avatar: profile.photos[0].value
                });
                return done(null, User);
            }     
        }
    )
)