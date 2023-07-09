// const mongoose = require('mongoose');
const { deleteMany } = require('../models/comments');
const post = require('../models/post');
const Comment = require('../models/comments');


module.exports.newPost = async function(req, res){
    try{
        const Post = await post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: Post
                },
                message: "Post Created!!"
            })
        }

        return res.redirect('/');
    }
    catch(err){
        console.log(err);
    }

    
}

module.exports.destroy = async function(req,res){
    await post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({post:req.params.id});
    return res.redirect('/');
}