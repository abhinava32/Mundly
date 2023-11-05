const express = require('express');

const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');
const assetController = require('../controllers/assetController');

//console.log("router loaded");

router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments')); 
router.use('/api', require('./API'));
router.use('/likes', require('./likes'));
router.get('/getpath' ,assetController.asset);
// router.get('/', (req, res) => {
//     res.send('Birds home page')
//   })


module.exports = router;