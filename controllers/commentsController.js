const Comment = require('../models/comments');
const Post = require('../models/post');
const User = require('../models/users');
const Likes = require('../models/likes');
const commentsMailer = require('../mailer/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function(req, res){

    let post = await Post.findById(req.body.post);
    if(post){
        var comment = await Comment.create({
            content: req.body.content,
            post: req.body.post, 
            user: req.user._id  
        });

        post.comments.push(comment);
        post.save();

        let user = await User.findById(req.user._id);
        // commentsMailer.newComment(comment, user.email);
        comment = await comment.populate('user', 'name email avatar');
        
        console.log("added email as ", comment.user.email);
        console.log("added ",comment);
        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment: comment,
                    user: user.name,
                    avatar: user.avatar
                },
                message: "Added new comment"
            });
        }

        let job = queue.create('emails', comment).save(function(err){
            if(err){
                console.log("error in sending to the queue", err);
                return;
            }
            //console.log('job enqued ', job.id);
        })

        //console.log(user.name);
        // let user = await 

        
        
        
        res.redirect('/');
        
    }
    else{
        //console.log("post not found!!");
    }
}

module.exports.destroy = async function(req, res){
    const comment = await Comment.findById(req.params.id);
    console.log("logged in user is ",req.user.id);
    if(comment.user == req.user.id){
        await Comment.findByIdAndDelete(req.params.id);
        let PostId = comment.post;
        await Post.findByIdAndUpdate(PostId, {$pull : {comments : req.params.id }});
        await Likes.deleteMany({
            likable: req.params.id
        });
        if(req.xhr){
            //console.log("xhr request found!!");
            return res.status(200).json({
                data: {
                    id : req.params.id
                },
                message: "Comment Deleted!!"
            });
        }
    }

    
    
    res.redirect('/');
}



