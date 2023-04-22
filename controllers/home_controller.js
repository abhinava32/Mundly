console.log("home called");

module.exports.home = function(req, res){
    console.log("home called");
    return res.end('<h1>Expresss is up for project</h1>')
}