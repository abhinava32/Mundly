const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/majorProject');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Got error while connecting to db"));

db.once('open', function(){
    console.log("Connected to database successfully!");
})

module.exports = db;