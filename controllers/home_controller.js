const post  = require('../models/post');

console.log("home called");

module.exports.home = async function(req, res){    
    const posts = await post.find({}).populate('user').exec();
    return res.render('home.ejs',{'title':'home page', posts:posts});
}