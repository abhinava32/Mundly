module.exports.profile = function(req, res){
    return res.render('profile');
    // return res.render('<form action="/users/profile/createProfile" method= "POST" >Name: <input type="text" name="name"><br><button type="submit">Submit</button></form>');
}