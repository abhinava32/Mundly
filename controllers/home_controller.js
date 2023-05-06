console.log("home called");

module.exports.home = function(req, res){
    console.log("home called");
    return res.render('home.ejs',{'title':'home page'});
}