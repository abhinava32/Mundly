const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/postController');


router.post('/new-post', passport.checkAuthentication ,postController.newPost);

module.exports = router;
