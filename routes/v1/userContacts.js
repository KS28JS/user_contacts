const express = require('express');
const Midware = require('../../common/middleware/auth');

const router = express.Router();
const userContactContoller = require('../../controllers/userContacts');

router.post('/create', Midware.authentication, userContactContoller.create);

router.patch('/update', Midware.authentication, userContactContoller.update);

router.get('/get', Midware.authentication, userContactContoller.get);

router.delete('/delete/:id', Midware.authentication, userContactContoller.delete);




module.exports = router;