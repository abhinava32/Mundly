const Users = require('../models/users');

module.exports.signIn = function(req,res){
    return res.render('sign-in',{'title': 'Facelook | signIn' });
}

module.exports.signUp = function(req,res){
    return res.render('sign-up',{'title': 'Facelook | signUp' });
}

module.exports.createSession = function(req,res){
    //todo later
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

    console.log("user already present!!")
    return res.redirect('back');
};


