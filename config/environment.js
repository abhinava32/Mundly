const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path:logDirectory
});

const development = {
    name: 'development',
    static_path: './Static',
    sessionCookieKey: 'blahsomething',
    databasePath: 'mongodb://localhost/majorProject',
    hostDomain: 'http://localhost:8000',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail',
        port: 587,
        secure: false,
        auth: {
            user: '<your eamil>', //put your email here
            pass: '<password>'
        }
    },
    clientID: "<Id>",
    clientSecret: "<Secret>", 
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    morgan:{
        mode: 'dev',
        options: {stream:accessLogStream}
    }

}

const production = {
    name: 'production',
    static_path: process.env.STATIC_PATH,
    sessionCookieKey: process.env.SESSION_COOKIE_KEY,
    databasePath: process.env.DATABASE_PATH,
    hostDomain: 'http://localhost:8000',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    },
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: process.env.GOOGLE_CALL_BACK_URL,
    morgan: {
        mode:'combined',
        options:{stream:accessLogStream}
    }
    
}

module.exports = production;