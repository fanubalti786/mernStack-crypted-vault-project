const crypto = require('crypto')

const encryptFile = (fileBuffer, encryptionKey) => {
    console.log("buffer",fileBuffer,"encrypt",encryptionKey);
    const iv = crypto.randomBytes(16);
    const cypher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    const encryptedData = Buffer.concat([cypher.update(fileBuffer), cypher.final()]);

    return {encryptedData,iv};
}

module.exports = {encryptFile}