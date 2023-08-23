const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function(email,password,done){
        //FIND A user and establish the identity
        user = await User.findOne({email: email});
            // if(err){

            // }
        if(!user){
            //console.log("User not found");
            return done(null,false);
        }

        else{
            if(user.password != password){
                //console.log("password did not matched!!");
                return done(null, false);
            }
            return done(null,user);
        } 
    }
)); 

//serializing
passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(async function(id,done){
    const user = await User.findById(id, 'name email avatar');
    return done(null, user);
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        //console.log("authenticated user found");
        return next();
    }
    //console.log("Passing by");
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;