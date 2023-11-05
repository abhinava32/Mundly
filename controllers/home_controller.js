const post  = require('../models/post');
// const Comments = require('../models/comments');
const users = require('../models/users');
const friendship = require('../models/friendships');
const User = require('../models/users');

// console.log("home called");

module.exports.home = async function(req, res){    
    const posts = await post.find({})
    .sort('-createdAt')
    .populate('user', 'name email avatar')
    .populate({
        path: 'likes',
        populate: {
            path: 'user'
        }
    })
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec();
    
    // const comments = await comments.find({}).populate(posts).exec();
    let usersList = await users.find({},'name email avatar');

    if(req.user){
        const user = await User.findById(req.user._id)
        .populate("friends")
        .exec();
        
        // console.log(user);
        const friends = user.friends;
        // console.log(friends);

        const requests = await friendship.find({$and: [{receiver: req.user.id}, {excepted: 'false'} ]}).populate('sender', 'name avatar');
        // console.log("friends>>"+friends);
        return res.render('home',
        {
            'title':'home page', 
            posts:posts,
            users: usersList,
            friends: friends ,
            requests: requests
        });
    }
    
    return res.render('sign-in',{'title': 'Mundly | signIn' });
}