// const mongoose = require('mongoose');
const { deleteMany } = require('../models/comments');
const post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/users');
const Likes = require('../models/likes');


module.exports.newPost = async function(req, res){
    try{
        console.log(req.body);
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
                    user: {
                        name: user.name,
                        avatar: user.avatar
                    }
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
    console.log(req.params);
    const Post = await post.findById(req.params.id);
    console.log(Post);
    console.log("logged in user is ",req.user.id);
    // const Likes = await post.findById
    if(Post.user == req.user.id){
        await post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({post:req.params.id});
        await Likes.deleteMany({likable:req.params.id});
    }

    if(req.xhr){
        console.log("sending response");
        return res.status(200).json({
            data: {
                id : req.params.id
            },
            message: "Post Deleted"
        });
    }
    
    return res.redirect('/');
}