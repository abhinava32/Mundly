const friendships = require('../models/friendships');
const users = require('../models/users');

module.exports.addFriends = async function(req, res){
    const user1 = req.user.id;
    const user2 = req.params.id;
    
    if(user1 == user2){
        return res.redirect('/');
    }

    const exist = await friendships.findOne(
        {$or: [
                {
                    $and:[{sender: user1},{receiver: user2}]
                },
                {
                    $and:[{sender: user2},{receiver: user1}]
                }
            ]
        });

    // console.log(exist);

    if(!exist){
        const newFriendship = await friendships.create({
            sender: user1,
            receiver: user2,
            excepted: false
        });   
    }

    return res.redirect('/');
}

module.exports.removeRelation = async function(req, res){
    
    let relation = await friendships.findById(req.params.id);
    
    await users.findByIdAndUpdate(relation.sender, {$pull: {friends: relation.receiver}});
    await users.findByIdAndUpdate(relation.receiver, {$pull: {friends: relation.sender}});
    await friendships.findByIdAndDelete(req.params.id);
    
    return res.redirect('back');
    // friendships.save();
}

module.exports.exceptRelation = async function(req, res){
    await friendships.findByIdAndUpdate(req.params.id, {$set: {excepted: true}});
    // friendships.save();

    let receiver = await users.findById(req.user._id);
    let relation = await friendships.findById(req.params.id);

    let sender = await users.findById(relation.sender);

    //console.log(sender);
    //console.log(receiver);

    sender.friends.push(receiver._id);
    sender.save();
    receiver.friends.push(sender._id);
    receiver.save();

    return res.redirect('back');
}
