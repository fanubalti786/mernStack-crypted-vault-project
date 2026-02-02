const express = require('express');
const router = express.Router();
const {uploadToIpfsController} = require('../controllers/uploaToIpfsController');
const { uploadUserImage } = require('../middlewares/multer');
const { authenticateToken } = require('../middlewares/authentication');



router.post('/uploadImage', uploadUserImage, authenticateToken , uploadToIpfsController)
const imageRouter = router;
module.exports = {imageRouter};