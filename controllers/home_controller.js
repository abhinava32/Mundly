const post  = require('../models/post');
// const Comments = require('../models/comments');

console.log("home called");

module.exports.home = async function(req, res){    
    const posts = await post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec();
    // const comments = await comments.find({}).populate(posts).exec();
    return res.render('home',{'title':'home page', posts:posts});
}