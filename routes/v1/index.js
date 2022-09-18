const express = require('express');
const router = express.Router();

const user = require('./user');
const userContacts = require('./userContacts');


router.use('/users', user);
router.use('/userContact', userContacts);


module.exports = router;
