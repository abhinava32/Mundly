const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const usersController = require('../controllers/users_controller');
const passport = require('passport');
// const createProfileController = require('../controllers/createUserController')
const profileController = require('../controllers/profileController');


// router.post('/createProfile',createProfileController.createProfile);
router.get('/sign-in', usersController.signIn);
router.post('/create-profile', usersController.createProfile);
router.get('/sign-up',usersController.signUp);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},    
    ), 
    usersController.createSession);

router.get('/profile', passport.checkAuthentication ,profileController.showProfile);

router.get('/sign-out', usersController.signOut);

module.exports = router;