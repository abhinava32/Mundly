const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    excepted: {
        type: Boolean
    }
},{
    timestamps: true
});

const friendships = mongoose.model('friendships',friendSchema);
module.exports = friendships;