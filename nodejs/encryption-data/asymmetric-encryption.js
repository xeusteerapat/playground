const crypto = require("crypto");
const fs = require("fs");

// openssl genrsa -out private_key.pem 4096 -> generate private key
// openssl rsa -pubout -in private_key.pem -out public_key.pem -> generate public key

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

function encryptText(plainText) {
  return crypto.publicEncrypt(
    {
      key: fs.readFileSync("public_key.pem", "utf8"),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(plainText)
  );
}

function decryptText(encryptedText) {
  return crypto.privateDecrypt(
    {
      key: fs.readFileSync("private_key.pem", "utf8"),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedText
  );
}

const email = "myemail@email.com";
const encrptedEmail = encryptText(email).toString("base64url");
const decrptedEmail = decryptText(
  Buffer.from(encrptedEmail, "base64url")
).toString();

console.log({ email, encrptedEmail, decrptedEmail });
