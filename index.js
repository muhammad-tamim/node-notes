const fs = require('fs');

// create  
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Writing using stream...');
writeStream.end();

// read
const readStream = fs.createReadStream('output.txt', 'utf8');
readStream.on('data', (chunk) => {
    console.log("Chunk received:", chunk);
});
