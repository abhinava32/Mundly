const Likes = require('../models/likes');
const Posts = require('../models/post');
const Comments = require('../models/comments');

module.exports.likesToggler = async function(req, res){
    const type = req.query.type;
    let likable;
    if(req.query.type == 'Post'){
        likable = await Posts.findById(req.query.id).populate('likes');
    }
    else{
        likable = await Comments.findById(req.query.id).populate('likes');
    }

    //check if like already exists
    const existingLike = await Likes.findOne({
        user: req.user.id,
        onModel: req.query.type,
        likable: req.query.id
    }) 

    if(existingLike){
        await likable.likes.pull(existingLike._id);
        likable.save();
        await Likes.findByIdAndDelete(existingLike._id);
        // existingLike.remove();
    }
    else{
        //create new like
        const newLike = await Likes.create({
            user: req.user._id,
            onModel: req.query.type,
            likable: req.query.id
        });

        likable.likes.push(newLike._id);
        likable.save();
    }

    
    return res.redirect('/');
}

