const crypto = require("crypto");
// const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // set random encryption key
// const IV = "5183666c72eec9e4"; // set random initialisation vector
const ENC_KEY = "MyutmTagisSecretAndYouCannotHack"; // set random encryption key
const IV = "5183666c72eec9e4"; // set random initialisation vector

// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');

const phrase = "who let the dogs out";

var encrypt = val => {
  let cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
  let encrypted = cipher.update(val, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

var decrypt = encrypted => {
  let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

let a = (encrypted_key = encrypt(phrase));
let b = (original_phrase = decrypt(encrypted_key));

console.log({ a, b });
