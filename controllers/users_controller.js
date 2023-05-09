const Users = require('../models/users');

module.exports.signIn = function(req,res){
    return res.render('sign-in',{'title': 'Facelook | signIn' });
}

module.exports.signUp = function(req,res){
    return res.render('sign-up',{'title': 'Facelook | signUp' });
}

module.exports.createSession = async function(req,res){
    user = await Users.findOne({email: req.body.email});

    //if user is found
    if(user){

        //if password is incorrect
        if(req.body.password != user.password){
            return res.redirect('back');
        }

        //create session
        res.cookie('user_id', user.id);
        return res.redirect('profile');
    }

    //if user not found
    return res.redirect('back');

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


