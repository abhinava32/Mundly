const env = require('../config/environment');
const fs = require('fs');
const path = require('path');

module.exports.asset = (req,res) => {
    const filePath = req.query.filepath;
    
    var pathName;
    if(env.name == 'development'){
        pathName = '/'+filePath;
    }
    else{       
        pathName = '/'+JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
    // console.log("requested file name is  ",filePath);
    // console.log(" requested file type is ", fileType);

    return res.status(200).json({
        data: pathName,
        message: "got it"
    });f



}