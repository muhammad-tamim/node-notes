<h1 align="center">Node.js Notes</h1>

- [Introduction:](#introduction)
    - [what is server, server-side language and database:](#what-is-server-server-side-language-and-database)
  - [Node.js:](#nodejs)
  - [How Node.js Processes a Request:](#how-nodejs-processes-a-request)
  - [What can node.js do:](#what-can-nodejs-do)
  - [Node.js vs Browser:](#nodejs-vs-browser)
  - [Common Architecture:](#common-architecture)
  - [How Web Works:](#how-web-works)
  - [Node Vs Express:](#node-vs-express)
  - [Common HTTP Status Codes:](#common-http-status-codes)
- [Modules:](#modules)
  - [Types of Modules:](#types-of-modules)
  - [Types of Module Systems:](#types-of-module-systems)
  - [Node Package Manager (NPM):](#node-package-manager-npm)
  - [Node Version Manager(NVM):](#node-version-managernvm)
  - [package.json:](#packagejson)
  - [Core Modules:](#core-modules)
    - [HTTP Module:](#http-module)
        - [Example:](#example)
    - [URL Module:](#url-module)
    - [path module:](#path-module)
    - [fs module:](#fs-module)
        - [Working with Files:](#working-with-files)
        - [Working with Folder (Directory):](#working-with-folder-directory)
        - [Streams:](#streams)
          - [Piping (automatic copying):](#piping-automatic-copying)
    - [OS Module:](#os-module)
    - [Crypto Module:](#crypto-module)
- [Raw Node.js Project:](#raw-nodejs-project)


# Introduction: 

### what is server, server-side language and database:

- server: A server is a physical or virtual computer that runs 24/7, receives requests from clients, processes them, and sends responses.

- server-side language: A server-side language is used to write logic that runs on the server to handle requests, apply business rules, and communicate with databases. Examples include Node.js, Go, Java, and Python with their frameworks.

- Database: A database is a system that permanently stores, manages, and retrieves data for server applications.

Explanation: 
- Server: During development, we use our own computer as a server, so when the computer is turned off, the server stops. In production, we deploy our backend code to hosting platforms like Vercel, which run our server-side code on cloud servers that operate 24/7. 

Note: The server runs the logic, the server-side language defines the logic, and the database stores the data.


## Node.js: 

Node.js is a JavaScript runtime that lets us execute JavaScript code outside of a web browser and allowing us to create servers, work with databases, access operating system functionality (file system, networking etc) and more with JavaScript. It is built on Chrome’s V8 JavaScript engine.

- Runtime is an node.js environment that allows Node.js to run JavaScript outside the browser. 


It's non-blocking I/O, event-driven, single-treaded and event loop architecture makes it highly efficient. so node is good for I/O heavy, event-driven: 
- Real-time applications (chats, collaboration tools)
- streaming applications 
- Microservices.

Note: Node.js may not be the best choice for CPU-intensive tasks, as they can block the event loop. For such tasks, consider building microservices in a more suitable language, such as Go or Java.

## How Node.js Processes a Request: 

```
Client Request
      |
      v
   Call Stack
      |
      |-- If SYNC task → executed immediately by main thread
      |
      |-- If ASYNC task:
      |        |
      |        |-- Network I/O / HTTP Requests / Promises etc
      |        |       → handled by main tread
      |        |
      |        |-- File system / Crypto / Compression / Some DB tasks
      |                → sent to Thread Pool 
      |        |
      |        v
      |        When async task are done → callback added to Callback Queue
      |
      v
Callback Queue
      |
      v
Event Loop
      |
      |-- Constantly checks:
      |       "Is Call Stack empty?"
      |
      |-- If YES → moves one callback from Callback Queue → Call Stack
      |
      v
Call Stack executes callback → sends response
      |
      v
Client receives response
```

Note: Thread Pool: A set of background worker threads that handle heavy CPU-intensive asynchronous tasks that would otherwise block the single main thread.

## What can node.js do:
- Build web servers and interact with databases
- Create APIs
  - RESTful APIs: Use HTTP methods (POST, GET, PUT, PATCH, DELETE) to interact with resources
  - GraphQL APIs: Client specifies exactly what data it needs in a single query
- Handle real-time data using WebSockets
- Read, write, and manage files on the server
- Build CLI (Command Line Interface) tools
 
## Node.js vs Browser:
Node.js and browsers both run JavaScript, but they have different environments and capabilities because Node.js is designed for server-side development, while browsers are for client-side applications.

| Node.js                                             | Browser                                                     |
| --------------------------------------------------- | ----------------------------------------------------------- |
| provides APIs for file system, networking, and OS   | do not                                                      |
| Global Object: global                               | Global Object:  window                                      |
| support CommonJS (require) and ES6 modules (import) | support only ES6 module (import)                            |
| uses npm/yarn for package management                | use CDN/bundlers(like webpack, vite) for package management |




## Common Architecture:
- Monolithic Architecture:
One big application that contains everything (frontend, backend, database), if one part fails, the entire app may fail.
Example: A simple e-commerce website where frontend + backend + database logic live in one project.

Application split into many small, independent services. Easy to scale and maintain.
Example: Netflix, Amazon, banking systems.

- Client-Server Architecture:
A client asks → server responds.
Example: Your React frontend (client) talking to Node.js API (server).

- 3-Tier Architecture(Most Common Web App Structure):
Three Layers: Presentation Layers (UI) + Application Layers (backend) + Database layer
Example: React → Node.js → MongoDB

- MVC Architecture:
Three Parts: Model (data and database logic) + View (UI) + Controller (Handles requests means calling model and returning response to view)

- Event-Driven Architecture:
Actions trigger events → other services react. Great for real-time application.

- Serverless Architecture:
You write code → cloud runs it on demand without managing servers.

## How Web Works:

![image](./images/how-web-works.webp)

![image](./images/the-structure-of-a-url.png)



## Node Vs Express:

| Feature                        | Node.js                    | Express                    |
| ------------------------------ | -------------------------- | -------------------------- |
| origin                         | Built on node.js           | Built on googl's V8 engine |
| Routing                        | Manual                     | Built-in                   |
| Middleware                     | need to write Manual logic | built-in                   |
| utility methods and properties | very limited               | lots of                    |

## Common HTTP Status Codes:

| Code | Message               | Description                                           |
| ---- | --------------------- | ----------------------------------------------------- |
| 200  | OK                    | Standard response for successful HTTP requests        |
| 201  | Created               | Request has been fulfilled and new resource created   |
| 301  | Moved Permanently     | Resource has been moved to a new URL                  |
| 400  | Bad Request           | Server cannot process the request due to client error |
| 401  | Unauthorized          | Authentication is required                            |
| 403  | Forbidden             | Server refuses to authorize the request               |
| 404  | Not Found             | Requested resource could not be found                 |
| 500  | Internal Server Error | Unexpected crash or bug                               |
| 503  | Service Unavailable   | Server down for maintenance                           |

Note: 
- 2xx → Success
- 3xx → Redirect
- 4xx → Client mistake
- 5xx → Server mistake


# Modules:
A module in Node.js is simply a reusable piece of code (a file or package) that you can import and use in other parts of your application.

## Types of Modules:
There are 3 Types of modules: 
1. Core Modules (built-in):
Nodes.js have several core modules like (fs, http, path, os). 
2.  Local Modules (your created file):
3.  Third party modules (install by npm or others package manager):
## Types of Module Systems: 
Since, js support 2 module system, node.js also support that two but node.js use common.js modules by default, if we want to use ES6 modules on node js, we have change `"type": "commonjs"` to `"type": "module"`
- Common.js: 
Uses require() to import and module.exports to export:

```js
// math.js
function add(a, b) {
    return a + b;
}
function sum(a, b) {
    return a + b;
}

module.exports =  {add, sum};
```
```js
const {add, sum} = require('./math');

console.log(add(5, 3)); // 8
console.log(sum(5, 3)); // 8
```

```js
// math.js
function add(a, b) {
    return a + b;
}
function sum(a, b) {
    return a + b;
}

exports.add =  add;
exports.sum = sum;
```
```js
const {add, sum} = require('./math');

console.log(add(5, 3)); // 8
console.log(sum(5, 3)); // 8
```


- ES6 Modules:
Uses import to import and export to export.

```js
export function add(a, b) {
    return a + b;
}
```
```js
import { add } from './math.js';

console.log(add(5, 3)); // 8
```

Or Default Export (single export):

```js
export default function add(a, b) {
    return a + b;
}
```

```js
import add from './math.js';

console.log(add(5, 3)); // 8
```
## Node Package Manager (NPM): 
Npm is default package manager for node.js packages.

```js
npm init -y // Create package.json quickly
npm install <pkg> // Install a package 
npm install --save-dev <pkg> // Install a package as dev-dependencies.
npm uninstall <pkg> // Remove a package
npm install -g <pkg> // Install globally
npm ls // List installed packages
```
## Node Version Manager(NVM):
NVM used to install and use different Node.js versions: 

```js
nvm install version // For install specific version
nvm use version // For Switch different version
npm ls // For see all install versions
```
## package.json:
package.json is a special file that describes your Node.js project. It contains information about your app, such as its name, version, dependencies, scripts, and more. 

For Creating a package.json we used: 
```js
npm init -y
```
Inside the Package.json:
```js
{
  "name": "javascripttest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```

when you install packages it added to the dependencies section:

```js
npm i express mongodb dotenv cors
```
```js
{
  "name": "javascripttest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "mongodb": "^7.0.0"
  }
}
```

and when you install a packages as a dev dependencies it added to the devDependencies section and its not used for projection, it's only install for development only:

```js
npm install --save-dev nodemon
```

```js
{
  "name": "javascripttest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "mongodb": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^29.5.0",
    "eslint": "^8.38.0"
  }
}
```

**Common package.json fields:**

Script: Define a custom scripts that can be run with npm run <script-name>

```js
{
  "name": "javascripttest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "mongodb": "^7.0.0"
  }
}
```
## Core Modules:
### HTTP Module:
The http module allows us to create HTTP servers and make HTTP requests on node.js. This is the module behind Express.


```js
// Import the HTTP module
const http = require('http');
const port = 3000;

// Create a server object
const app = http.createServer((req, res) => {

    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // We can skip this header because Node.js automatically
    // sets "Content-Type: text/plain" when sending a plain string.

    res.end('Hello, World!\n');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
```
here,
- http.createServer() - Creates a new HTTP server instance
- The callback function is executed for each request with two parameters:
  - req - request object containing data from the client 
  - res - response object used to send data back to the client 
- res.writeHead() - Sets the response status code and headers
- res.end() - Sends the response and ends the connection
- server.listen() - Starts the server on the specified port

Note: req and res in Express are the SAME base objects from Node.js, but Express enhances them with many helpful methods and properties.

- Node req: req.url, req.method, req.headers 
  - Express req: req.params, req.query, req.body, req.path, req.ip, req,cookies

- Node res: res.writeHead(), res.write(), res.end()
  - Express res: res.send(), res.json(), res.status, res.redirect(), res.set(), res.download()


##### Example: 
```js
const http = require('http');
const { MongoClient } = require("mongodb");

const port = 3000;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    await client.connect();
    const coffeeCollection = client.db("coffeedb").collection('coffees');

    const app = http.createServer(async (req, res) => {
        if (req.method === "GET" && req.url === "/coffees") {
            const result = await coffeeCollection.find().toArray();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Not Found" }));
        }
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
run().catch(console.dir);
```

Same example with express: 
```js
app.get('/coffees', async (req, res) => {
  const result = await coffeeCollection.find().toArray()
  res.send(result)
})
```
### URL Module:
The url module helps you parse URLs, build URLs, and work with query strings

```js
const { URL } = require('url');

const myUrl = new URL('https://example.com/products?category=shoes&sort=asc');
console.log(myUrl);

/*
URL {
  href: 'https://example.com/products?category=shoes&sort=asc',
  origin: 'https://example.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'example.com',
  hostname: 'example.com',
  port: '',
  pathname: '/products',
  search: '?category=shoes&sort=asc',
  searchParams: URLSearchParams { 'category' => 'shoes', 'sort' => 'asc' },
  hash: ''
}
*/
```
- Work wit query parameters: 

```js
const { URL } = require('url');

const myUrl = new URL('https://example.com/products?category=shoes&sort=asc');

console.log(myUrl.searchParams.get('category'));  // shoes
console.log(myUrl.searchParams.has('sort'));  // true

myUrl.searchParams.append('page', '2'); //  add new parameter
console.log(myUrl.href); // https://example.com/products?category=shoes&sort=asc&page=2

myUrl.searchParams.set('sort', 'desc'); // update 
console.log(myUrl.href); // https://example.com/products?category=shoes&sort=desc&page=2

myUrl.searchParams.delete('category');
console.log(myUrl.href); // https://example.com/products?sort=desc&page=2

// both gives full url
console.log(myUrl.toString());
console.log(myUrl.href);
```
### path module:
The path module helps you work with file paths and directory paths in Node.js. It's essential for handling file system operations in a cross-platform way.

Key Methods: 

- path.join: Joins multiple path together:

```js
const path = require('path');

const fullPath = path.join('/users', 'john', 'documents', 'file.txt');
console.log(fullPath);
// '/users/john/documents/file.txt' on linux and macOS
// '\users\john\documents\file.txt' on Windows
```

- path.resolve(): Returns the absolute path starting from root (/):

```js
const path = require('path');

const result = path.resolve('folder', 'file.txt');
console.log(result); // /home/muhammad-tamim/programming/notes/node-notes/folder/file.txt
```

- path.basename() - Returns the last portion of a path, means the file name:

```js
const path = require('path');

console.log(path.basename('/users/john/file.txt')); // 'file.txt'
console.log(path.basename('/users/john/file.txt', '.txt')); // 'file'
```

- path.dirname() - Get Parent Folder:

```js
const path = require('path');

console.log(path.dirname('/folder/folder-2/file.txt')); // /folder/folder-2
```

- path.extname() - Returns the file extension:

```js
console.log(path.extname('file.txt')); // '.txt'
console.log(path.extname('archive.tar.gz')); // '.gz'
```

- path.parse() - Break Path into objects

```js
const path = require('path');

console.log(path.parse('/folder/folder-2/file.txt'));

/*
{
  root: '/',
  dir: '/folder/folder-2',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/
```

- path.format() - Creates a path string from an object (opposite of parse):

```js
const path = require('path');

const pathObj = {
    dir: '/users/john',
    base: 'file.txt'
};
console.log(path.format(pathObj)); // '/users/john/file.txt'
```

Note:__dirname and __filename are special Node variables and they don't depend fs module

```js
console.log(__dirname);  // directory name of current file
console.log(__filename); // full path including file name

/*
/home/muhammad-tamim/programming/notes/node-notes
/home/muhammad-tamim/programming/notes/node-notes/index.js
*/
```

Example: 

```js
const path = require('path');

// Get current file's directory
const currentDir = __dirname;

// Build path to a config file
const configPath = path.join(currentDir, 'config', 'settings.json');

// Extract information
console.log('Full path:', configPath);
console.log('Directory:', path.dirname(configPath));
console.log('Filename:', path.basename(configPath));
console.log('Extension:', path.extname(configPath));
```
### fs module:
The fs module allows you to manage files and folders directly from your Node.js server.

You can use it in two ways:
- Synchronous (bloc the thread) – using fs.writeFileSync() ,fs.readFileSync() etc. 
- Asynchronous (non-blocking) – using fs.writeFile() ,fs.readFile() etc
As a backend developer, always prefer asynchronous because Node.js is single-threaded.

##### Working with Files:

**create files:**

- fs.writeFile(): Creates new file OR overwrites existing file

```js
const fs = require('fs');

fs.writeFile('data.txt', 'Hello Tamim!', (err) => {
    if (err) console.log(err);
    else console.log("File written successfully!");
});
```

**Read files:**

```js
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }
    console.log(data);
});
```

**Update files:**

- fs.appendFile: Adds new content without removing old content.

```js
const fs = require('fs');

fs.appendFile('data.txt', '\nNew line added!', (err) => {
    if (err) console.log(err);
    else console.log('Data appended!');
});
```

**Delete files:**

```js
const fs = require('fs');

fs.unlink('data.txt', (err) => {
    if (err) console.log(err);
    else console.log('File deleted!');
});
```

**Renaming files:**

```js
const fs = require('fs');

fs.rename('old.txt', 'new.txt', (err) => {
    if (err) console.log(err);
    else console.log('File renamed!');
});
```

**Checking files existence:**

```js
const fs = require('fs');

fs.access('data.txt', fs.constants.F_OK, (err) => {
    if (err) {
        console.log("File does NOT exist");
    } else {
        console.log("File exists");
    }
});
```

```js
const fs = require('fs');

fs.stat('text.txt', (err, stats) => {
    if (err) return console.log(err);

    console.log(stats.isFile());  // true or false
    console.log(stats.isDirectory());
});
```

**Copying files:** 

```js
const fs = require('fs');

fs.copyFile('a.txt', 'backup.txt', err => {
    if (err) console.log(err);
});
```

**Watching Files:**

```js
const fs = require('fs');

fs.watch('notes.txt', () => {
    console.log('File changed!');
});
```

##### Working with Folder (Directory):

**Create a folder:**

```js
const fs = require('fs');

fs.mkdir('myFolder', (err) => {
    if (err) console.log(err);
    else console.log('Folder created!');
});
```
For Nested folder:

```js
const fs = require('fs');

fs.mkdir('a/b/c', { recursive: true }, (err) => {
    if (err) console.log(err);
    else console.log('Nested folders created!');
});
```

**Delete a folder:** 

```js
const fs = require('fs');

fs.rmdir('myFolder', { recursive: true }, err => {});
```

**Reading folder contents:**

```js
const fs = require('fs');

fs.readdir('myFolder', (err, files) => {
    if (err) console.log(err);
    else console.log(files); // returns array of filenames
});
```


##### Streams: 
Streams let you read or write data piece by piece, instead of loading everything into memory at once. This is great for large files, network requests, or continuous data.

| Type      | Description                       | Example                         |
| --------- | --------------------------------- | ------------------------------- |
| Readable  | Data can be read                  | `fs.createReadStream()`, `req`  |
| Writable  | Data can be written               | `fs.createWriteStream()`, `res` |
| Duplex    | Can read and write simultaneously | TCP sockets                     |
| Transform | Can read, modify, then write data | `zlib.createGzip()`             |

```js
// basic example of readable stream
const fs = require('fs');

const readStream = fs.createReadStream('input.txt', 'utf8');

readStream.on('data', chunk => {
    console.log('Received chunk:', chunk);
});

readStream.on('end', () => {
    console.log('Finished reading file.');
});

readStream.on('error', err => {
    console.error('Error reading file:', err);
});

```
here, 
- data → fired for each chunk
- end → fired when file is fully read
- error → handle errors


```js
// basic example of writable stream

const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello ');
writeStream.write('World!\n');
writeStream.end(); // closes the stream

writeStream.on('finish', () => {
    console.log('Finished writing file.');
});

writeStream.on('error', err => {
    console.error('Error writing file:', err);
});

```


###### Piping (automatic copying): 
Piping connects a readable stream to a writable stream to copy data automatically. so data automatically flows from the source to the destination without manually handling chunks.

```js
const fs = require('fs');

// Source file (input)
const readStream = fs.createReadStream('input.txt', 'utf8');
// Destination file (output)
const writeStream = fs.createWriteStream('output.txt');

// Pipe the read stream INTO the write stream
readStream.pipe(writeStream);
```
### OS Module: 
The os module provides operating system-related utility methods and properties. It's useful for getting information about the system your Node.js application is running on.The module gives you information about (CPU, Memory, User, Network, Platform, System uptime etc)

- System Information: 

```js
const os = require('os');

console.log(os.platform()); // Output: 'darwin' (macOS), 'win32' (Windows), 'linux', etc.
console.log(os.type()); // Output: 'Linux', 'Darwin', 'Windows_NT'
console.log(os.arch()); // Output: 'x64', 'arm', 'arm64', 'ia32'
console.log(os.release()); // Output: '10.0.19042' (Windows), '6.14.0-36-generic' (Linux)
console.log(`System uptime: ${os.uptime()} seconds`); // System uptime: 31937.63 seconds
console.log(`Uptime: ${(os.uptime() / 3600).toFixed(2)} hours`);
```

- CPU Information: 

```js
const os = require('os');

console.log(os.cpus());

/*
[
  {
    model: 'Intel(R) Core(TM) i3-3217U CPU @ 1.80GHz',
    speed: 1795,
    times: { user: 1485240, nice: 1260, sys: 321220, idle: 5200940, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i3-3217U CPU @ 1.80GHz',
    speed: 1795,
    times: { user: 1451820, nice: 540, sys: 305600, idle: 5244270, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i3-3217U CPU @ 1.80GHz',
    speed: 1795,
    times: { user: 1436820, nice: 2780, sys: 297600, idle: 5271690, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i3-3217U CPU @ 1.80GHz',
    speed: 1795,
    times: { user: 1490470, nice: 760, sys: 301340, idle: 5222880, irq: 0 }
  }
]
*/
```

```js
const os = require('os');

console.log(`Number of CPUs: ${os.cpus().length}`); // Number of CPUs: 4
console.log(`CPU Speed: ${os.cpus()[0].speed} MHz`); // CPU Speed: 1795 MHz
```

```js
// Calculate cpu usage:

const os = require('os');

function getCPUUsage() {
    const cpus = os.cpus();

    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach(cpu => {
        for (let type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    });

    const idle = totalIdle / cpus.length;
    const total = totalTick / cpus.length;
    const usage = 100 - (100 * idle / total);

    return usage.toFixed(2);
}

console.log(`CPU Usage: ${getCPUUsage()}%`);
```

- Memory Information:

```js
const os = require('os');

console.log(`Total Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`); // Total Memory: 3.69 GB
console.log(`Used Memory: ${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`); 
// Used Memory: 2.95 GB
console.log(`Free Memory: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`); //  Free Memory: 0.68 GB
```

- User Information:

```js
const os = require('os');

console.log(`Username: ${os.userInfo().username}`); // Username: muhammad-tamim
console.log(`Home Directory: ${os.userInfo().homedir}`); // Home Directory: /home/muhammad-tamim
console.log(`Shell: ${os.userInfo().shell}`); // Shell: /bin/bash
console.log(`UID: ${os.userInfo().uid}`); // UID: 1000
console.log(`GID: ${os.userInfo().gid}`); // GID: 1000
```

- Network Interfaces:

```js
const os = require('os');

console.log(os.networkInterfaces());

/*
{
  lo: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8'
    },
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '::1/128',
      scopeid: 0
    }
  ],
  wlp6s0: [
    {
      address: '192.168.43.147',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '64:5a:04:58:42:f7',
      internal: false,
      cidr: '192.168.43.147/24'
    },
    {
      address: 'fe80::6274:3e86:810e:d97e',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '64:5a:04:58:42:f7',
      internal: false,
      cidr: 'fe80::6274:3e86:810e:d97e/64',
      scopeid: 3
    }
  ]
}
*/
```

- Hostname:

```js
const os = require('os');

console.log(os.hostname()); // Inspiron-3421
```
### Crypto Module:
The crypto module in Node.js provides cryptographic functionality including hashing, encryption, decryption, signing, and more. It's essential for security-related operations.

- Hashing (sha256, sha512):

```js
const crypto = require('crypto');

const hash = crypto.createHash('sha256');
hash.update('Hello World');
const digest = hash.digest('hex'); // hex, base64, binary
console.log(digest); // a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e

// sha256
const hash1 = crypto.createHash('sha256').update('Hello World').digest('hex');
console.log(hash1); // a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e

// sha512
const hash2 = crypto.createHash('sha512').update('Hello World').digest('hex');
console.log(hash2);
// 2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b
```

With Secret key(stripe, bkash etc):

```js
const crypto = require("crypto");

const secret = "mySecretKey123";
const message = "hello world";

const hmac = crypto.createHmac("sha256", secret)
                   .update(message)
                   .digest("hex");

console.log(hmac);
```


- Encrypt and Decrypt:

```js
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
```

- Generate Random Values: used for OTP, Verification tokens, password reset links, session ides etc

```js
const crypto = require('crypto');

console.log(crypto.randomBytes(16).toString('hex')); // b06d050428688aa7d835bcb76ade2beb
```

```js
const crypto = require('crypto');

const otp = crypto.randomInt(100000, 999999);
console.log(otp); // 963880
```

```js
const crypto = require('crypto');

console.log(crypto.randomUUID()); // 136dfef5-b9d7-4b88-943f-519487ecba33
```


# Raw Node.js Project: 

```js
const http = require('http');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const { URL } = require('url');

const port = 3000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    await client.connect();
    const userCollection = client.db("userdb").collection('users');


    const app = http.createServer(async (req, res) => {

        const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
        const pathname = parsedUrl.pathname


        // create:
        if (req.method === "POST" && pathname === "/users") {
            let body = "";
            req.on("data", chunk => body += chunk);
            req.on("end", async () => {
                try {
                    const data = JSON.parse(body);
                    const result = await userCollection.insertOne(data);
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ insertedId: result.insertedId, ...data }));
                } catch (err) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Invalid JSON" }));
                }
            });
            return;
        }


        // Read:
        if (req.method === "GET" && pathname === "/users") {
            try {
                const result = await userCollection.find().toArray();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(result));
            }
            catch (err) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Not Found" }));
            }
            return
        }

        // read single data
        if (req.method === "GET" && pathname.startsWith("/users/")) {
            const id = pathname.split("/")[2];
            try {
                const result = await userCollection.findOne({ _id: new ObjectId(id) });
                if (!result) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "User not found" }));
                    return;
                }
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(result));
            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid ID" }));
            }
            return;
        }



        // Update:
        if (req.method === "PATCH" && pathname.startsWith("/users/")) {
            const id = pathname.split("/")[2];
            let body = "";
            req.on("data", chunk => body += chunk);
            req.on("end", async () => {
                try {
                    const data = JSON.parse(body);
                    const result = await userCollection.updateOne(
                        { _id: new ObjectId(id) },
                        { $set: data }
                    );
                    if (result.matchedCount === 0) {
                        res.writeHead(404, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "User not found" }));
                        return;
                    }
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "User updated" }));
                } catch (err) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Invalid ID or JSON" }));
                }
            });
            return;
        }



        // Delete:
        if (req.method === "DELETE" && pathname.startsWith("/users/")) {
            const id = pathname.split("/")[2]
            try {
                const result = await userCollection.deleteOne({ _id: new ObjectId(id) })
                if (result.deletedCount === 0) {
                    res.writeHead(404, { "content-type": "application/json" })
                    res.end(JSON.stringify({ error: "User not found" }))
                    return
                }
                res.writeHead(200, { "content-type": "application/json" })
                res.end(JSON.stringify({ message: "User Deleted" }))
            } catch (err) {
                res.writeHead(400, { "content-type": "application/json" })
                res.end(JSON.stringify({ error: "Invalid ID" }))
            }
            return
        }

        // Not Found
        res.writeHead(404, { "content-type": "application/json" })
        res.end(JSON.stringify({ error: "Route not found" }))
    });


    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
run().catch(console.dir);
```

Explanation: 

```js
const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
const pathname = parsedUrl.pathname

// example url get request: http://localhost:3000/users/692c849cb0169439d71850c7
console.log(req.url) // /users/692c849cb0169439d71850c7
console.log(parsedUrl)
/*
URL {
href: 'http://localhost:3000/users/692c849cb0169439d71850c7',
origin: 'http://localhost:3000',
protocol: 'http:',
username: '',
password: '',
host: 'localhost:3000',
hostname: 'localhost',
port: '3000',
pathname: '/users/692c849cb0169439d71850c7',
search: '',
searchParams: URLSearchParams {},
hash: ''
}
*/
console.log(pathname) // /users/692c849cb0169439d71850c7
```
here, 
- `req.url` → gives the URL path and query string of the incoming request. 
For example if a client requests: GET http://localhost:3000/users/123?sort=asc then req.url = /users/123?sort=asc

- URL is the built in global class form the url module, its need a full url to make it object: 

```js
const { URL } = require('url');

const myURL = new URL('http://localhost:3000/users/123?sort=asc');
console.log(myURL)

/*
 URL {
  href: 'http://localhost:3000/users/123?sort=asc',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/users/123',
  search: '?sort=asc',
  searchParams: URLSearchParams { 'sort' => 'asc' },
  hash: ''
}
 */
```

but in our case we just have, req.url = /users/123?sort=asc, so thats why we used: 

```js
const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
// req.headers.host = localhost:3000
```

- `const pathname = parsedUrl.pathname`, juts give us /users/123 pathname, means its not have query parameters and others info. This allows us to match routes like /users or /users/:id easily without worrying about query parameters.

---

```js
if (req.method === "POST" && pathname === "/users") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
        try {
            const data = JSON.parse(body);
            const result = await userCollection.insertOne(data);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ insertedId: result.insertedId, ...data }));
        } catch (err) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
    });
    return;
}
```
We know earlier that req is a readable stream, so here:

- `req.on("data", chunk => body += chunk);` 
  - data is fired every time a chunk of data arrives.
  - We append it to a variable because the request body may arrive in multiple pieces. This variable collects all the pieces.

- `req.on("end", async () => { ... });`
  - Fired when all chunks have been received.
  - At this point, body has the full request body and we can parse it with JSON.parse

in short: 
- req.on("data") → get pieces of incoming data chunk by chunk
- req.on("end") → all data received, now process it



