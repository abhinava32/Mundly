const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const usersController = require('../controllers/users_controller');
// const createProfileController = require('../controllers/createUserController')
const profileController = require('../controllers/profileController');


// router.post('/createProfile',createProfileController.createProfile);
router.get('/sign-in', usersController.signIn);
router.post('/create-profile', usersController.createProfile);
router.get('/sign-up',usersController.signUp);
router.post('/create-session', usersController.createSession);
router.get('/profile',profileController.showProfile);



module.exports = router;