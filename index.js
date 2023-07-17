const express = require('express');                             // import express
const port = 8000;                                              // port number
const app = express();                                          // express object creation
const path = require('path');                                    
const cookieParser = require('cookie-parser');                  //import cookie parser to use the functionalities of cookies
const expressLayouts = require('express-ejs-layouts');          //this import helps in creating layout and partial
const passport = require('passport');           
const session = require('express-session'); 
const passportLocal = require('./config/passport-local-strategy'); 
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());                      // this is middleware used for conversion of the request into string
app.use(cookieParser());                            // object creation of cookieparser and using it as a middleware
app.use(expressLayouts);                            // another middleware for layouts
app.set('layout extractStyles', true);              // so that different style files can be associated to different ejs files in views
app.set('layout extractScripts', true);             // same as above for js
//use express router
                // redirecting to routes folder
app.use(express.static('Static'));                  // setting the path for static files such as css, js and images
app.use('/uploads', express.static(__dirname+'/uploads'));
app.set('view engine', 'ejs');                      
app.set('views',path.join(__dirname,'views'));


app.use(session({
    name: 'codial',
    
    //TODO Change the secret before deployment
    secret: "blahSomething",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/majorProject',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

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