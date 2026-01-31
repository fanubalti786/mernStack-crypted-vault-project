const express = require('express');
const router = express.Router();
const {uploadImageController} = require('../controllers/uploadImageController')


router.post('/uploadImage', uploadImageController)
const imageRouter = router;
module.exports = {imageRouter};