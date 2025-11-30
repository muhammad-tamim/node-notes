const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);  // Secret key (must be 32 bytes)
const iv = crypto.randomBytes(16);   // Initialization vector (16 bytes)

// Encrypt Function
function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;  // unreadable string
}

// Decrypt Function
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;  // original text
}

// Example
const message = "Hello Tamim!";
const encrypted = encrypt(message);
const decrypted = decrypt(encrypted);

console.log("Original:", message);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);

/*
Original: Hello Tamim!
Encrypted: c4deb1169e947cf9e6abcab85c4b9b29
Decrypted: Hello Tamim!
*/