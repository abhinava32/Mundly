const env = require('./config/environment');
const express = require('express'); 
const logger = require('morgan');  
const cors = require('cors');                          // import express
const port = 8000;                                              // port number
const app = express();                                          // express object creation
require('./config/view-helper')(app); 
const path = require('path');                                    
const cookieParser = require('cookie-parser');                  //import cookie parser to use the functionalities of cookies
const expressLayouts = require('express-ejs-layouts');          //this import helps in creating layout and partial
const passport = require('passport');           
const session = require('express-session'); 
const passportLocal = require('./config/passport-local-strategy'); 
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-startegy');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const { Console } = require('console');

const chatServer = require('http').createServer(app);
    const chatSockets = require('./config/chatSocket').chatSocket(chatServer);
    chatServer.listen(5000); //port number can ne changed
    //console.log("chat server is listening on port number 5000");

if(env.name == "development"){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.static_path, 'scss'),
        dest: path.join(__dirname,env.static_path,'css'),
        debug: false,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}



app.use(express.urlencoded({extended: false}));                      // this is middleware used for conversion of the request into string
app.use(cookieParser());                            // object creation of cookieparser and using it as a middleware
app.use(expressLayouts);                            // another middleware for layouts
app.set('layout extractStyles', true);              // so that different style files can be associated to different ejs files in views
app.set('layout extractScripts', true);             // same as above for js
//use express router
                // redirecting to routes folder
app.use(express.static(env.static_path));                  // setting the path for static files such as css, js and images
//console.log(env.static_path);
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(logger(env.morgan.mode, env.morgan.options));

app.use('/cssa',express.static(path.join(__dirname,'node_modules', 'bootstrap','dist','css')));
app.use('/js',express.static(path.join(__dirname,'node_modules', 'bootstrap','dist','js')));
app.set('view engine', 'ejs');                      
app.set('views',path.join(__dirname,'views'));


app.use(session({
    name: 'codial',
    
    //TODO Change the secret before deployment
    secret: env.sessionCookieKey,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: env.databasePath,
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

const server = app.listen(port, function(err){
    if(err){
        console.log(`Error while creating server: ${err}`);
        return;
    }
    //console.log(`Server is running on port: ${port}`);
    
})


