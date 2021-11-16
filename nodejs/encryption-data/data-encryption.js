const crypto = require("crypto");
require("dotenv").config();

const email = "myemail@gmail.com";

// const initVector = process.env.INIT_VECTOR; // 16 chars
// const securityKey = process.env.SECRET_KEY; // 32 chars
const initVector = crypto.randomBytes(16); // 16 chars
const salt = crypto.randomBytes(32);
const securityKey = crypto.scryptSync(process.env.SECRET_KEY, salt, 32); // 32 chars

const cipher = crypto.createCipheriv("aes-256-cbc", securityKey, initVector);

let encryptedEmail = cipher.update(email, "utf-8", "hex");
encryptedEmail += cipher.final("hex");

const decipher = crypto.createDecipheriv(
  "aes-256-cbc",
  securityKey,
  initVector
);

let decryptedEmail = decipher.update(encryptedEmail, "hex", "utf-8");
decryptedEmail += decipher.final("utf8");

console.log({ encryptedEmail, decryptedEmail });

// 549e2a6190e16f2668ed0ea8343bcb315685f43b8ae2a4831b640feb67f12d1c

const decipher2 = crypto.createDecipheriv(
  "aes-256-cbc",
  "MyutmTagisSecretAndYouCannotHack",
  "yomoaihealthyeah"
);

let decryptedEmail2 = decipher2.update(
  "549e2a6190e16f2668ed0ea8343bcb315685f43b8ae2a4831b640feb67f12d1c",
  "hex",
  "utf-8"
);
decryptedEmail2 += decipher2.final("utf8");
console.log(decryptedEmail2);
