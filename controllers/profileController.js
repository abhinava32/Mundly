const Users = require('../models/users');

module.exports.showProfile = async function(req,res){
    if(!req.isAuthenticated){
        return res.render('profile',{'name':'please sign in first', 'title':'profile'});
    }
    console.log(req.cookies);
    user = await Users.findOne({_id:req.cookies.user_id});
    console.log(user);
    return res.render('profile',{'title':'profile'});
}