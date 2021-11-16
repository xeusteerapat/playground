const crypto = require("crypto");
require("dotenv").config();

const algorithm = "aes-256-cbc";
const superSecret = process.env.SECRET_KEY;

const salt = crypto.randomBytes(32);
const secretKey = crypto.scryptSync(superSecret, salt, 32);
const initVector = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, secretKey, initVector);

const email = "myemail@email.com";

let encryptedEmail = cipher.update(email, "utf-8", "hex");
encryptedEmail += cipher.final("hex");

const decipher = crypto.createDecipheriv(algorithm, secretKey, initVector);

let decryptedEmail = decipher.update(encryptedEmail, "hex", "utf-8");
decryptedEmail += decipher.final("utf8");

console.log({ encryptedEmail, decryptedEmail });
