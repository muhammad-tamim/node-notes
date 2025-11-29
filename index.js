const os = require('os');

console.log(os.platform());
console.log(os.type());
console.log(os.release());
console.log(os.version());

// console.log(`Number of CPUs: ${cpus.length}`);
// console.log(cpus[0]);

const totalMem = os.totalmem();
console.log(`Total Memory: ${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`);

const freeMem = os.freemem();
console.log(`Free Memory: ${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`);

console.log(os.homedir());
console.log(os.tmpdir());

const userInfo = os.userInfo();
console.log(userInfo);

console.log(os.hostname());

const interfaces = os.networkInterfaces();
console.log(interfaces);

const uptime = os.uptime();
console.log(`System uptime: ${(uptime / 3600).toFixed(2)} hours`);

const load = os.loadavg();
console.log(`Load average: ${load}`);