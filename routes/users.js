const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const usersController = require('../controllers/users_controller');
const passport = require('passport');
// const createProfileController = require('../controllers/createUserController')
const profileController = require('../controllers/profileController');
const friendshipController = require('../controllers/friendshipController');



// router.post('/createProfile',createProfileController.createProfile);
router.get('/forgotpsd', usersController.forgotPsd);
router.get('/reset-password',usersController.resetPassword);
router.post('/match-otp',usersController.matchOtp);
router.post('/send-otp', usersController.sendOtp);
router.get('/sign-in', usersController.signIn);
router.post('/create-profile', usersController.createProfile);
router.get('/sign-up',usersController.signUp);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},    
    ), 
    usersController.createSession);

router.get('/profile/:id', passport.checkAuthentication ,profileController.showProfile);
router.post('/profile/update/:id', passport.checkAuthentication, profileController.updateProfile);
router.get('/sign-out', usersController.signOut);
router.get('/add-friend/:id', passport.checkAuthentication ,friendshipController.addFriends);
router.get('/remove-relation/:id', passport.checkAuthentication ,friendshipController.removeRelation);
router.get('/except-request/:id', passport.checkAuthentication ,friendshipController.exceptRelation);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);



module.exports = router;