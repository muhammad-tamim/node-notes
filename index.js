const crypto = require('crypto');

const otp = crypto.randomInt(100000, 999999);
console.log(otp);