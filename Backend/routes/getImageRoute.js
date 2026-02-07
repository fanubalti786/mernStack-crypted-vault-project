const express = require('express');
const router = express.Router();
const {getImageController} = require('../controllers/getImageController');
const { authenticateToken } = require('../middlewares/authentication');


router.post('/getImage', authenticateToken , getImageController)
const getImageRouter = router;
module.exports = {getImageRouter};