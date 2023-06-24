// const mongoose = require('mongoose');
const post = require('../models/post');

module.exports.newPost = function(req, res){
    post.create({
        content: req.body.content,
        user: req.user._id
    });
    return res.redirect('/');
}