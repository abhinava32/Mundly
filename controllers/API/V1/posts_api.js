const posts = require('../../../models/post');
const comments = require('../../../models/comments');
const { findById } = require('../../../models/users');

module.exports.index = async function(req,res){
    Posts = await posts.find({})
    .sort('-createdAt')
    .populate('user', 'name avatar')
    .populate({
        path: 'comments',
        populate: { 
            path: 'user',
            select: 'name email avatar'
        }
    });

    return res.json(200,{
        message: "Lists of posts",
        posts: Posts
    })
}

module.exports.destroy = async function(req,res){
    try {
        const Post = await posts.findById(req.params.id);
    // if(Post.user == req.user.id){
        await posts.findByIdAndDelete(req.params.id);
        await comments.deleteMany({post:req.params.id});
    // }

        return res.json(200, {
            message: "Post and associated comments are deleted!!"
        })
    
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: "Internal server error!!"
        })
    }
}


/*
module.exports.index = function(req, res){
    return res.json(200, {
        message: "posts list",
        posts: []
    })
}

*/