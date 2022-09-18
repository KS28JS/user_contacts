const express = require('express');
const Midware = require('../../common/middleware/auth');
const userController = require('../../controllers/user');
const router = express.Router();


router.post('/register', userController.register);

router.post('/signin', userController.signin);


module.exports = router;