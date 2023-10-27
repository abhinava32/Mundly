const { redirect, render } = require('express/lib/response');
const Users = require('../models/users');
const friendships = require('../models/friendships');

module.exports.forgotPsd = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('forgot-password',{'title': 'Mundly | Forgot Password'});
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-in',{'title': 'Mundly | signIn' });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-up',{'title': 'Mundly | signUp' });
}



module.exports.createProfile = async function(req,res){
    //console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    var user = await Users.findOne({email: req.body.email});
    if(!user){
        user = await Users.create(req.body);
        console.log("added  "+user.name);
        console.log("DP destination is "+Users.avatarPath+'/'+'default-profile.jpg');
        user.avatar = await Users.avatarPath+'/'+'default-profile.jpg';
        await user.save()
        return res.render('sign-in',{'title': 'Mundly | signIn' });
    }

    //console.log("user already present!!");
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

module.exports.addFriends = async function(req, res){
    const user1 = req.user.id;
    const user2 = req.params.id;
    
    if(user1 == user2){
        return res.redirect('/');
    }

    const exist = await friendships.findOne(
        {$or: [
                {
                    $and:[{sender: user1},{receiver: user2}]
                },
                {
                    $and:[{sender: user2},{receiver: user1}]
                }
            ]
        });

    // console.log(exist);

    if(!exist){
        const newFriendship = await friendships.create({
            sender: user1,
            receiver: user2,
            excepted: false
        });   
    }

    return res.redirect('/');
}

module.exports.sendOtp = async function(req, res){
    try{
        // const email = req.body.email;
        const returnedEmail = await Users.findOne({email:req.body.email});
        if(returnedEmail){
            return res.status(200).json({
                data: {
                    found: true
                },
                message: "OTP Sent Successfully!!"
            });
        }
        else{
            return res.status(200).json({
                data:{
                    found: false
                },
                message: "User not found"
            })
        }
        
    }
    catch(err){
        console.log(err);
        return redirect('/');
    }
}

module.exports.matchOtp = function(req,res){
    try{
        res.status(200).json({
            data:{
                matched: true
            },            
            message:"recieved OTP"
        });
    }
    catch(err){
        console.log(err);
        return redirect('/');
    }
}

module.exports.resetPassword = function(req, res){
    return res.render('reset-password',{'title': 'Mundly | reset password' });
}

