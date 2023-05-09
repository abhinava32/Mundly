const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const usersController = require('../controllers/users_controller');
// const createProfileController = require('../controllers/createUserController')



// router.post('/createProfile',createProfileController.createProfile);
router.get('/create-session', usersController.signIn);
router.post('/create-profile', usersController.createProfile);
router.get('/sign-up',usersController.signUp)

module.exports = router;