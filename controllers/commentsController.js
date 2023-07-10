const Comment = require('../models/comments');
const Post = require('../models/post');

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
        PostId = comment.post;
        await Post.findByIdAndUpdate(PostId, {$pull : {comments : req.params.id }});
    }
    
    res.redirect('/');
}



