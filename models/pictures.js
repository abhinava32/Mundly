const mongoose = require('mongoose');

const photosSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type:  String,
        required: true
    }
});
const pictures = mongoose.model('pictures', photosSchema);
module.exports = pictures;