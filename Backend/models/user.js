const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userAddress: {
        type: String,
        required: true
    },

    encryptionKey: {
        type: Buffer,
    },


},{timestamps: true});

const userModel = mongoose.model("Users",userSchema);

module.exports = {userModel}