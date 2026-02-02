const express = require('express');
const router = express.Router();
const {authController} = require('../controllers/authController');


router.post('/authentication', authController)
const userRouter = router;
module.exports = {userRouter};