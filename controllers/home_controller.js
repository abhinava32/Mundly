const post  = require('../models/post');
// const Comments = require('../models/comments');
const users = require('../models/users');

console.log("home called");

module.exports.home = async function(req, res){    
    const posts = await post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec();
    // const comments = await comments.find({}).populate(posts).exec();
    const usersList = await users.find({});
    return res.render('home',
                        {
                            'title':'home page', 
                            posts:posts,
                            users: usersList  
                        }
                    );
}