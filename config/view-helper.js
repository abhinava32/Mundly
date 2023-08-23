const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        if(env.name == 'development'){
            return filePath;
        }
        
        const pathName = '/'+JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
        console.log("Path Name:",pathName);
        return pathName;
    }
}