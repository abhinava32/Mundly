const Users = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.showProfile = async function(req,res){
    if(!req.isAuthenticated){
        return res.render('profile',{'name':'please sign in first', 'title':'profile'});
    }
    console.log(req.cookies);
    user = await Users.findOne({_id:req.params.id});
    console.log(user);
    return res.render('profile',{'title':'profile', profile_user:user});
}

module.exports.updateProfile = async function(req, res){
    // await Users.findByIdAndUpdate(req.params.id, req.body);
    try {
        let user = await Users.findById(req.params.id);
        Users.uploadAvatar(req,res, async function(err){
            if(err){console.log(err)};

            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }

                user.avatar =  await Users.avatarPath + '/' + req.file.filename;
            }
            await user.save();
            
        })
    } catch (error) {
        console.log(error);
    }
    return res.redirect('/');
}