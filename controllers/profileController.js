const Users = require('../models/users');
const friendships = require('../models/friendships');
const fs = require('fs');
const path = require('path');

module.exports.showProfile = async function(req,res){
    if(!req.isAuthenticated){
        return res.render('profile',{'name':'please sign in first', 'title':'profile'});
    }
    const user = await Users.findOne({_id:req.params.id}, 'email name avatar');
    const relation = await friendships.findOne({$or: [
        {$and: [
                {sender: req.user},{receiver: req.params.id}
            ]},
        {$and: [
                {sender: req.params.id},{receiver: req.user}
            ]}
    ]});
    
    var statusCode = 12; //just a random number 12


    /* 

        statusCodes                Meaning           
        ----------------------------------------------------------
            '0'           Request has been sent from the logged
                                    in user
            
            '1'           Request has been sent by the profile user
            
            '2'           There exist a friendship between the two

            '3'           No Friendship and niether any request exists 

    */

    if(relation){
        if(relation.excepted){
            statusCode = 2;
        }
        else if(relation.sender.equals(req.user._id)){
            statusCode = 0;
        }
        else{
            statusCode = 1;
        }
        return res.render('profile',{'title':'profile', profile_user:user, 'statusCode': statusCode, 'relation': relation._id});
    }
    else{
        statusCode = 3;
    }

    // console.log(req.cookies);
    

    return res.render('profile',{'title':'profile', profile_user:user, 'statusCode': statusCode});
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
                    try{
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    catch(err){
                        console.log(err);
                    }
                    
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