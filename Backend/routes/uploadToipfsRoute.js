const express = require('express');
const router = express.Router();
const {uploadToIpfsController} = require('../controllers/uploaToIpfsController');
const { uploadUserImage } = require('../middlewares/multer');


router.post('/uploadImage',uploadUserImage, uploadToIpfsController)
const imageRouter = router;
module.exports = {imageRouter};