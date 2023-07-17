const Comment = require('../models/comments');
const Post = require('../models/post');
const User = require('../models/users');

module.exports.create = async function(req, res){

    let post = await Post.findById(req.body.post);
    if(post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post, 
            user: req.user._id  
        });

        post.comments.push(comment);
        post.save();

        let user = await User.findById(req.user._id);
        console.log(user.name);
        // let user = await 

        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment: comment,
                    user: user.name
                },
                message: "Added new comment"
            });
        }
        
        
        res.redirect('/');
        
    }
    else{
        console.log("post not found!!");
    }
}

module.exports.destroy = async function(req, res){
    const comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id){
        await Comment.findByIdAndDelete(req.params.id);
        let PostId = comment.post;
        await Post.findByIdAndUpdate(PostId, {$pull : {comments : req.params.id }});
    }

    if(req.xhr){
        console.log("xhr request found!!");
        return res.status(200).json({
            data: {
                id : req.params.id
            },
            message: "Comment Deleted!!"
        });
    }
    
    res.redirect('/');
}



