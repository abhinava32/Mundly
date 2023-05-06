const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
//use express router
app.use('/', require('./routes'));
app.use(express.static('Static'));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));



const db = require('./config/mongoose');
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:false}));

app.listen(port, function(err){
    if(err){
        console.log(`Error while creating server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})