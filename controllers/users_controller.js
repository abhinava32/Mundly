const { redirect } = require('express/lib/response');
const Users = require('../models/users');

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-in',{'title': 'Facelook | signIn' });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-up',{'title': 'Facelook | signUp' });
}



module.exports.createProfile = async function(req,res){
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    user = await Users.findOne({email: req.body.email});
    if(!user){
        await Users.create(req.body);
        return res.render('sign-in',{'title': 'Facelook | signIn' });
    }

    console.log("user already present!!");
    return res.redirect('back');
};

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.signOut = function(req,res){
    req.logout(function(err){
        if(err){
            console.log("error in logout!!");
        }
    });
    return res.redirect('/');
}