const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(env.databasePath);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Got error while connecting to db"));

db.once('open', function(){
    //console.log("Connected to database successfully!");
})

module.exports = db;