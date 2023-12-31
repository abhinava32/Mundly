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
            user: process.env.MUNDLY_EMAIL_ID,
            pass: process.env.MUNDLY_EMAIL_PASSWORD
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
    static_path: process.env.MUNDLY_STATIC_PATH,
    sessionCookieKey: process.env.MUNDLY_SESSION_COOKIE_KEY,
    databasePath: process.env.MUNDLY_DATABASE_PATH,
    hostDomain: 'http://localhost:8000',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MUNDLY_EMAIL_ID,
            pass: process.env.MUNDLY_EMAIL_PASSWORD
        }
    },
    clientID: '913160551182-rt5073e15va05rksp6ckvqeca0hsvj8i.apps.googleusercontent.com',
    clientSecret: process.env.MUNDLY_GOOGLE_CLIENT_SECRET, 
    callbackURL: process.env.MUNDLY_GOOGLE_CALL_BACK_URL,
    morgan: {
        mode:'combined',
        options:{stream:accessLogStream}
    }
    
}

module.exports = eval(process.env.MUNDLY_ENVIRONMENT) == undefined ? development : eval(process.env.MUNDLY_ENVIRONMENT);
