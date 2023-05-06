module.exports.createProfile = function(req, res){
    router.use(bodyParser.urlencoded({extended:false}));
    const name = req.body.name;
    return res.send('<h1>Welcome '+name+' </h1>');
}