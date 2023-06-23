const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("router loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));
// router.get('/', (req, res) => {
//     res.send('Birds home page')
//   })


module.exports = router;