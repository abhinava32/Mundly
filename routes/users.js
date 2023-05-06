const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const usersController = require('../controllers/users_controller');
const createProfileController = require('../controllers/createUserController')

router.get('/profile', usersController.profile);

router.post('/createProfile',createProfileController.createProfile);

module.exports = router;