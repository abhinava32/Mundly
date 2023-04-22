const express = require('express');
const port = 8000;
const app = express();

//use express router
app.use('/', require('./routes'));




// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:false}));

app.listen(port, function(err){
    if(err){
        console.log(`Error while creating server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})