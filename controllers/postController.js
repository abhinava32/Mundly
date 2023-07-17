// const mongoose = require('mongoose');
const { deleteMany } = require('../models/comments');
const post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/users');


module.exports.newPost = async function(req, res){
    try{
        const Post = await post.create({
            content: req.body.content,
            user: req.user._id
        });

        const user = await User.findById(Post.user);
        // console.log("user's data is "+user.name);

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: Post,
                    user: user.name
                },
                message: "Post Created!!"
            });
        }

        return res.redirect('/');
    }
    catch(err){
        console.log(err);
    }

    
}

module.exports.destroy = async function(req,res){
    const Post = await post.findById(req.params.id);
    if(Post.user == req.user.id){
        await post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({post:req.params.id});
    }

    if(req.xhr){
        
        return res.status(200).json({
            data: {
                id : req.params.id
            },
            message: "Post Deleted"
        });
    }
    
    return res.redirect('/');
}