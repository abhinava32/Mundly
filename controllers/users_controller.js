const { redirect } = require('express/lib/response');
const Users = require('../models/users');
const friendships = require('../models/friendships');

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

    user = await Users.findOne({email: req.body.email});
    if(!user){
        await Users.create(req.body);
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

