<h1 align="center">Node.js Notes</h1>

- [Part 1: Node:](#part-1-node)
  - [Introduction:](#introduction)
    - [How Node.js Processes a Request:](#how-nodejs-processes-a-request)
    - [What can node.js do:](#what-can-nodejs-do)
    - [Node.js vs Browser:](#nodejs-vs-browser)
    - [Common Architecture:](#common-architecture)
    - [How Web Works:](#how-web-works)
    - [Node Vs Express:](#node-vs-express)
    - [Common HTTP Status Codes:](#common-http-status-codes)
    - [How to take input in node.js like C, C++:](#how-to-take-input-in-nodejs-like-c-c)
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
- [Part 2: Express:](#part-2-express)
  - [Setup:](#setup)
  - [Routing:](#routing)
    - [Route parameters:](#route-parameters)
    - [Query Parameters:](#query-parameters)
  - [Middleware:](#middleware)
  - [Sending Response:](#sending-response)
  - [Router:](#router)
  - [Route chaining:](#route-chaining)
  - [Serving static files:](#serving-static-files)
- [Part 3: MongoDB:](#part-3-mongodb)
  - [How a api code works:](#how-a-api-code-works)
  - [What is CRUD Operation:](#what-is-crud-operation)
  - [Create(POST)](#createpost)
    - [insertOne():](#insertone)
    - [insertMany():](#insertmany)
  - [Read(GET)](#readget)
    - [find():](#find)
      - [cursor:](#cursor)
    - [findOne():](#findone)
    - [countDocuments():](#countdocuments)
    - [distinct():](#distinct)
    - [aggregate() and Pipeline:](#aggregate-and-pipeline)
      - [Common Aggregation Stages:](#common-aggregation-stages)
  - [Update( PATCH/PUT )](#update-patchput-)
    - [PATCH (partial update - recommended):](#patch-partial-update---recommended)
      - [updateOne():](#updateone)
      - [updateMany():](#updatemany)
      - [Patch Operators:](#patch-operators)
    - [PUT (Full Replace):](#put-full-replace)
      - [replaceOne():](#replaceone)
      - [findOneAndReplace():](#findoneandreplace)
  - [Delete(DELETE)](#deletedelete)
    - [deleteOne():](#deleteone)
    - [deleteMany():](#deletemany)
    - [findOneAndDelete():](#findoneanddelete)
  - [bulkWrite():](#bulkwrite)
  - [Difference Between req.body, req.params and req.query:](#difference-between-reqbody-reqparams-and-reqquery)
- [Part 4: Node + Express + MongoDB:](#part-4-node--express--mongodb)
  - [setup:](#setup-1)
  - [Examples:](#examples)
    - [Example 1:](#example-1)
    - [Example 2:](#example-2)
  - [Others:](#others)
    - [Different way to  Accessing form data:](#different-way-to--accessing-form-data)
      - [Manual accessing:](#manual-accessing)
      - [Using formData():](#using-formdata)
- [Part 5: PostgreSQL:](#part-5-postgresql)
- [Part 6: Node + Express + PostgreSQL:](#part-6-node--express--postgresql)
  - [Example:](#example-1)
    - [Example 1:](#example-1-1)


# Part 1: Node: 

## Introduction: 
Node.js is a JavaScript runtime that lets us execute JavaScript code outside of a web browser and allowing us to create servers, work with databases, access operating system functionality (file system, networking etc) and more with JavaScript. It is built on Chrome’s V8 JavaScript engine.

- Runtime is an node.js environment that allows Node.js to run JavaScript outside the browser. 

It's non-blocking I/O, event-driven, single-treaded and event loop architecture makes it highly efficient. so node is good for I/O heavy, event-driven: 
- Real-time applications (chats, collaboration tools)
- streaming applications 
- Microservices.

Note: Node.js may not be the best choice for CPU-intensive tasks, as they can block the event loop. For such tasks, consider building microservices in a more suitable language, such as Go or Java.

### How Node.js Processes a Request: 

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

### What can node.js do:
- Build web servers and interact with databases
- Create APIs
  - RESTful APIs: Use HTTP methods (POST, GET, PUT, PATCH, DELETE) to interact with resources
  - GraphQL APIs: Client specifies exactly what data it needs in a single query
- Handle real-time data using WebSockets
- Read, write, and manage files on the server
- Build CLI (Command Line Interface) tools
 
### Node.js vs Browser:
Node.js and browsers both run JavaScript, but they have different environments and capabilities because Node.js is designed for server-side development, while browsers are for client-side applications.

| Node.js                                             | Browser                                                     |
| --------------------------------------------------- | ----------------------------------------------------------- |
| provides APIs for file system, networking, and OS   | do not                                                      |
| Global Object: global                               | Global Object:  window                                      |
| support CommonJS (require) and ES6 modules (import) | support only ES6 module (import)                            |
| uses npm/yarn for package management                | use CDN/bundlers(like webpack, vite) for package management |




### Common Architecture:
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

### How Web Works:

![image](./images/how-web-works.webp)

![image](./images/the-structure-of-a-url.png)



### Node Vs Express:

| Feature                        | Node.js                    | Express                    |
| ------------------------------ | -------------------------- | -------------------------- |
| origin                         | Built on node.js           | Built on googl's V8 engine |
| Routing                        | Manual                     | Built-in                   |
| Middleware                     | need to write Manual logic | built-in                   |
| utility methods and properties | very limited               | lots of                    |

### Common HTTP Status Codes:

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

### How to take input in node.js like C, C++:

```js
const argv = process.argv;

const name = argv[2]
const age = argv[3]

console.log(argv)
console.log(name, age)

/*
process.argv[0] = node path
process.argv[1] = file path
process.argv[2] = first actual input value

[
  '/home/muhammad-tamim/.nvm/versions/node/v24.4.1/bin/node',
  '/home/muhammad-tamim/programming/notes/node-notes/index.js',
  'tamim',
  '20'
]
*/
```

## Modules:
A module in Node.js is simply a reusable piece of code (a file or package) that you can import and use in other parts of your application.

### Types of Modules:
There are 3 Types of modules: 
1. Core Modules (built-in):
Nodes.js have several core modules like (fs, http, path, os). 
2.  Local Modules (your created file):
3.  Third party modules (install by npm or others package manager):
### Types of Module Systems: 
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
### Node Package Manager (NPM): 
Npm is default package manager for node.js packages.

```js
npm init -y // Create package.json quickly
npm install <pkg> // Install a package 
npm install --save-dev <pkg> // Install a package as dev-dependencies.
npm uninstall <pkg> // Remove a package
npm install -g <pkg> // Install globally
npm ls // List installed packages
```
### Node Version Manager(NVM):
NVM used to install and use different Node.js versions: 

```js
nvm install version // For install specific version
nvm use version // For Switch different version
npm ls // For see all install versions
```
### package.json:
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
### Core Modules:
#### HTTP Module:
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
#### URL Module:
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
#### path module:
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
#### fs module:
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
#### OS Module: 
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
#### Crypto Module:
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


## Raw Node.js Project: 

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




# Part 2: Express:
Express.js is a minimal, flexible and fast web framework for Node.js. It makes building APIs and web servers much easier than using the raw http module.

## Setup: 
```js
npm init -y
npm install express
```

```js
const express = require("express");
const app = express();
const port = 3000;

// Home route
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

## Routing:

```js
// GET request
app.get('/users', (req, res) => {
    res.send('Get all users');
});

// POST request
app.post('/users', (req, res) => {
    res.send('Create a new user');
});

// PUT request
app.put('/users/:id', (req, res) => {
    res.send(`Update user ${req.params.id}`);
});

// DELETE request
app.delete('/users/:id', (req, res) => {
    res.send(`Delete user ${req.params.id}`);
});
```

### Route parameters:
Access dynamic values form the url:

```js
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

// Multiple parameters
app.get('/posts/:year/:month', (req, res) => {
    res.json({
        year: req.params.year,
        month: req.params.month
    });
});
```

### Query Parameters: 
Access query strings from the URL:

```js
// URL: /search?term=express&limit=10
app.get('/search', (req, res) => {
    const term = req.query.term;
    const limit = req.query.limit;
    res.json({ term, limit });
});
```

## Middleware: 

Middleware = A functions that run before your route handler. it have access to the request and response objects and can modify them or end the request-response cycle.

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Built-in middleware for parsing JSON
app.use(express.json());


// application lavel middleware
app.use((req, res, next) => {
    console.log(`form custom middleware: ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware
});

// route specific Middleware 
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === 'secret-token') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};


app.get('/protected', authenticate, (req, res) => {
    res.send('This is protected content');
});

// Route that triggers an error
app.get('/error', (req, res, next) => {
    const err = new Error('Something went wrong!');
    next(err); // Pass error to error-handling middleware
});

// wildcard middleware (for unmatched routes)
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// error handling middleware
// Use it to catch errors thrown in routes or middleware.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message 
  });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

Note: When the client sends this:

```js
{
  "name": "Tamim",
  "age": 20
}
```

You can access it in Express like:

```js
req.body.name
req.body.age
```
Without express.json(), req.body will always be undefined.

## Sending Response: 
Express provides several ways to send responses:

```js
  res.send('Plain text response');
  
  // Send JSON
  res.json({ message: 'JSON response' });
  
  // Send with status code
  res.status(404).send('Not found');
  
  // Redirect
  res.redirect('/another-page');
  
  // Send file
  res.sendFile(__dirname + '/index.html');
```

## Router:
Organize routes using Express Router:

routes/users.js:
```js
const express = require('express');
const router = express.Router(); 

// GET /api/users
router.get('/', (req, res) => {
  res.send('Get all users');
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  res.send(`Get user ${req.params.id}`);
});

module.exports = router;
```

index.js: 
```js
const express = require('express');
const app = express();
const PORT = 3000;

// import the router
const userRoutes = require('./routes/users');

// mount the router with a prefix
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Route chaining: 

```js
// Route chaining for /users
app.route('/users')
  .get((req, res) => {
    // GET /users - fetch all users
    res.send('Get all users');
  })
  .post((req, res) => {
    // POST /users - create a new user
    const newUser = req.body;
    res.send(`User created: ${JSON.stringify(newUser)}`);
  })
  .put((req, res) => {
    // PUT /users - update all users (just an example)
    res.send('Update all users');
  });

// Route chaining for /users/:id
app.route('/users/:id')
  .get((req, res) => {
    res.send(`Get user with ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

## Serving static files: 

Express provides a built-in middleware called express.static to serve static files like (html, css, js, images etc).

```js
public/
    ├── index.html
    └── images/
        └── logo.png

http://localhost:3000/index.html
http://localhost:3000/images/logo.png
```

```js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```


# Part 3: MongoDB:
MongoDB is a NoSQL document database that stores data flexibly in JSON(Actually BSON = Binary JSON) format. Unlike traditional SQL relational databases with tables and rows, MongoDB uses collections and documents.

Note: BSON is a binary-based representation of JSON. MongoDB uses this format for faster data operations, support for more data types, and efficient storage.

Note: In the context of MongoDB, a document is basically a single record in a collection, similar to a row in a SQL database.

```
SQL                      MongoDB
------------------       -------------------
Database                 Database
  └── Table                └── Collection
        └── Row                  └── Document
              └── Column               └── Field

```

## How a api code works:

```js
app.post('/users', async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result); 
});
```

here,
- `app.post('/users'.......)`: 
  - `app` is a variable that contains express object (const app = express()).
  - `.post()` is a methods of the app object
  - `'/users'` is a endPoint(URL path). When the client sends a POST request to /users, this code runs.

- `async/await`: 
  - `async` marks the function as asynchronous so you can use await inside it.
  - `await` works same like .then(), it's pause the async function until the promise if resolved.
  
- `(req, res) => {...}`: this is a anonymous arrow function that contains two parameters: 
  - req = request object containing data from the client (req.body, req.params, req.query)
  - res = response object used to send data back to the client (res.json(), res.send(), res.status())

so we can do the same things using .then():

```js
app.post('/users', (req, res) => {
    const user = req.body;
    usersCollection.insertOne(user)
    .then(result => res.send(result))
});

```

**Note:**

In the frontend we need two .then(), because fetch() returns a response object, and you must convert it using .json() before using in the your code.

```js
fetch('api')
.then(res => res.json())
.then(data => console.log(data))
```

But in mongodb methods are already return js object when their promises resolve. So inside express we don't need to use res.json(), we can directly send the object using res.send().



## What is CRUD Operation:

| Operation  | HTTP Method   | Meaning          |
| ---------- | ------------- | ---------------- |
| **Create** | `POST`        | Add new document |
| **Read**   | `GET`         | Fetch document   |
| **Update** | `PUT / PATCH` | Modify document  |
| **Delete** | `DELETE`      | Remove document  |

- PUT = Replaces the entire document with the new data.
- PATCH = Updates only specific fields without touching others field of the document.


## Create(POST)

### insertOne():
Insert a single document

```js
app.post('/users', async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result); 
});
```

Note: Sometimes we generate some values ourselves:

```js
// Create a single user with custom fields
app.post('/users', async (req, res) => {
    const user = req.body;

    // Generate custom fields
    user.createdAt = new Date();
    user.role = "user"; 

    const result = await usersCollection.insertOne(user);
    res.send(result);
});
```

### insertMany():
Insert multiple documents

```js
app.post('/users/bulk', async (req, res) => {
    const users = req.body; // array of objects
    const result = await usersCollection.insertMany(users);
    res.send(result);
});
```

## Read(GET)

### find(): 
Get all data:

```js
app.get('/users', async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
});
```

note: find() returns a **cursor**, so you need to use .toArray() methods to convert the cursor to array. 

#### cursor:
A cursor is an object that MongoDB returns when you run a query like find(). It does not immediately give all the data — instead, it gives a pointer to the result set. Because MongoDB may return thousands or millions of documents, so returning all at once could:
- use too much RAM
- slow your server
- cause performance issues

A cursor also allows you to do `limit()`, `sort()`, `skip()`, `forEach()`, `map()`, `toArray()`:
- `toArray`: 
Converts a cursor into a JavaScript array
```js
app.get('/users', async (req, res) => {

const users = await usersCollection.find()
console.log(users) // cursor

const result = await users.toArray();
console.log(result) // array
    
res.send(result);
});
```

- `limit()`:
Limit how many documents you want

```js
app.get('/users', async (req, res) => {
    const result = await usersCollection
        .find()
        .limit(10)
        .toArray();

    res.send(result);
});
```

- `skip()`:


```js
app.get('/users', async (req, res) => {
    const page = parseInt(req.query.page); // http://localhost:3000/users?page=${page}
    const limit = 5;
    const skip = (page - 1) * limit;

    const result = await usersCollection
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();

    res.send(result);
});
```
Page 1 → skip 0
Page 2 → skip first 5
Page 3 → skip first 10

- `sort()`:
Sort documents by a field

```js
app.get('/users', async (req, res) => {
    const result = await usersCollection
        .find()
        .sort({ createdAt: -1 })   // -1 = descending, 1 = ascending
        .toArray();

    res.send(result);
});
```


- `forEach()`:
Iterate each element with no return:

```js
app.get('/users', async (req, res) => {
    const cursor = usersCollection.find();

    const users = [];
    await cursor.forEach(user => {
        users.push(user.name);
    });

    res.send(users);
});
```

- `map()`:
Iterate each element and returns a new cursor, not an array..

```js
app.get('/users/names', async (req, res) => {
    const cursor = usersCollection.find();

    const result = await cursor.map(user => {
        return {
            id: user._id,
            name: user.name,
        };
    }).toArray();

    res.send(result);
});
```

### findOne():
Get a single item by ID:

```js
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.findOne(query);
    res.send(result);
});
```

### countDocuments():
returns a number after Counting matching documents

```js
app.get('/users', async (req, res) => {
    const role = req.query.role; // GET http://localhost:3000/users?role=user
    const total = await usersCollection.countDocuments({ role });
    res.send( total );
});
```

### distinct():
Returns an array of unique values of a specific field/key:

```js
// GET /users/roles
app.get('/users/roles', async (req, res) => {
    const roles = await usersCollection.distinct("role");
    res.send( roles );
});
```

### aggregate() and Pipeline:
- aggregate() is a method used to process data through a pipeline. Its returns a cursor.
- A pipeline is an array of stages. Each step in the pipeline is called a stage. Each stage processes the documents and passes them to the next stage.

Note: Each stage starts with $ and the full array we called it pipeline

```js
db.collection.aggregate([
  { $stage1: { ... } },
  { $stage2: { ... } },
  ...
])
```



Common Aggregation Operators:

| Operator                   | Purpose                    |
| -------------------------- | -------------------------- |
| `$sum`                     | Sum values                 |
| `$avg`                     | Average value              |
| `$min`                     | Minimum value              |
| `$max`                     | Maximum value              |
| `$first`                   | First value in group       |
| `$last`                    | Last value in group        |
| `$push`                    | Add value to array         |
| `$addToSet`                | Add unique values to array |
| `$concat`                  | Concatenate strings        |
| `$substr`                  | Substring                  |
| `$gte`, `$lte`, `$eq` etc. | Comparison operators       |
| `$cond`                    | Conditional expression     |

Note: MongoDB has lots of operators,

```js
// Arithmetic & Statistical:
$sum, $avg, $min, $max, $first, $last, $stdDevPop, $stdDevSamp

// String Operators:
$concat, $substr, $substrBytes, $substrCP, $toUpper, $toLower, $trim, $split, $indexOfBytes, $indexOfCP

// Array Operators
$push, $addToSet, $size, $filter, $map, $reduce, $arrayElemAt, $concatArrays, $slice, $reverseArray, $indexOfArray

// Conditional & Comparison Operators:
$cond, $ifNull, $eq, $ne, $gt, $gte, $lt, $lte, $and, $or, $not, $switch

// Type Conversion Operators:
$toInt, $toDouble, $toString, $type, $convert, $round, $trunc, $floor, $ceil
```

#### Common Aggregation Stages:

- $match - Filters documents  

```js
app.get('/users/adults', async (req, res) => {
  const adults = await usersCollection.aggregate([
    { $match: { age: { $gte: 18 } } }
  ]).toArray();
  res.send(adults);
});
```
Explanation: Only returns users whose age is 18 or greater.

Input:
```
[
  { name: "Alice", age: 25 },
  { name: "Bob", age: 16 },
  { name: "Charlie", age: 30 }
]
```
Output:
```
[
  { name: "Alice", age: 25 },
  { name: "Charlie", age: 30 }
]
```

- $group - Groups documents and performs aggregations

```js
app.get('/users/city-count', async (req, res) => {
  const cityCounts = await usersCollection.aggregate([
    { $group: { _id: "$city", totalUsers: { $sum: 1 } } }
  ]).toArray();
  res.send(cityCounts);
});
```
Explanation: Groups users by city and counts how many users are in each city.

Input:
```
[
  { name: "Alice", city: "New York" },
  { name: "Bob", city: "London" },
  { name: "Charlie", city: "New York" },
  { name: "David", city: "Tokyo" }
]
```

Output:
```
[
  { _id: "New York", totalUsers: 2 },
  { _id: "London", totalUsers: 1 },
  { _id: "Tokyo", totalUsers: 1 }
]
```

Example 2: 

```js
app.get('/orders/total-revenue', async (req, res) => {
  const revenue = await ordersCollection.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
  ]).toArray();
  res.send(revenue);
});
```
Explanation: Sums all order amounts to get total revenue.

Input: 
```
[
  { orderId: 1, amount: 100 },
  { orderId: 2, amount: 200 },
  { orderId: 3, amount: 150 }
]
```
Output:
```
[
  { _id: null, totalRevenue: 450 }
]
```

Example 2: 

```js
app.get('/users/average-age', async (req, res) => {
  const avgAge = await usersCollection.aggregate([
    { $group: { _id: null, averageAge: { $avg: "$age" } } }
  ]).toArray();
  res.send(avgAge);
});
```
Explanation: Calculates the average age of all users (25 + 30 + 20) / 3 = 25.

Input:
```
[
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 }
]
```
Output:
```
[
  { _id: null, averageAge: 25 }
]
```

Example 3:

```js
app.get('/users/age-range', async (req, res) => {
  const ageRange = await usersCollection.aggregate([
    { $group: { 
        _id: null, 
        maxAge: { $max: "$age" },
        minAge: { $min: "$age" }
    } }
  ]).toArray();
  res.send(ageRange);
});
```
Explanation: Finds the oldest (30) and youngest (20) user ages.

Input: 
```
[
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 }
]
```
Output:
```
[
  { _id: null, maxAge: 30, minAge: 20 }
]
```

Example 4: 

```js
app.get('/cities/users-list', async (req, res) => {
  const cityUsers = await usersCollection.aggregate([
    { $group: { 
        _id: "$city", 
        userNames: { $push: "$name" }
    } }
  ]).toArray();
  res.send(cityUsers);
});
```
Explanation: Groups users by city and creates an array of user names for each city.

Input: 
```
[
  { name: "Alice", city: "New York" },
  { name: "Bob", city: "London" },
  { name: "Charlie", city: "New York" }
]
```
Output:
```
[
  { _id: "New York", userNames: ["Alice", "Charlie"] },
  { _id: "London", userNames: ["Bob"] }
]
```

- $project - Selects or reshapes fields

```js
app.get('/users/names', async (req, res) => {
  const names = await usersCollection.aggregate([
    { $project: { name: 1, age: 1, _id: 0 } }
  ]).toArray();
  res.send(names);
});
```
Explanation: Returns only name and age fields, excludes _id and city.

Input: 
```
[
  { _id: 1, name: "Alice", age: 25, city: "New York" },
  { _id: 2, name: "Bob", age: 30, city: "London" }
]
```

Output:
```
[
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
]
```
- $sort - Sorts documents

```js
app.get('/users/sorted', async (req, res) => {
  const sorted = await usersCollection.aggregate([
    { $sort: { age: -1 } }  // -1 = descending, 1 = ascending
  ]).toArray();
  res.send(sorted);
});
```
Explanation: Sorts users by age in descending order (oldest first).

Input:
```
[
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 }
]
```
Output:
```
[
  { name: "Bob", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Charlie", age: 20 }
]
```
- $limit - Limits the number of documents

```js
app.get('/users/top-3', async (req, res) => {
  const topUsers = await usersCollection.aggregate([
    { $sort: { age: -1 } },
    { $limit: 3 }
  ]).toArray();
  res.send(topUsers);
});
```
Explanation: Returns only the top 3 oldest users.

Input:
```
[
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 },
  { name: "David", age: 35 },
  { name: "Eve", age: 28 }
]
``` 
Output:
```
[
  { name: "David", age: 35 },
  { name: "Bob", age: 30 },
  { name: "Eve", age: 28 }
]
```
- $skip - Skips a number of documents (used for pagination)

```js
app.get('/users/page-2', async (req, res) => {
  const page2 = await usersCollection.aggregate([
    { $skip: 2 },
    { $limit: 2 }
  ]).toArray();
  res.send(page2);
});
```
Explanation: Skips the first 2 documents and returns the next 2 (pagination).

Input:
```
[
  { name: "Charlie" },
  { name: "David" }
]
```
Output:
```
[
  { name: "Charlie" },
  { name: "David" }
]
```
- $unwind - Deconstructs an array into separate documents

```js
app.get('/users/hobbies', async (req, res) => {
  const hobbies = await usersCollection.aggregate([
    { $unwind: "$hobbies" }
  ]).toArray();
  res.send(hobbies);
});
```
Explanation: Creates a separate document for each hobby in the array.

Input:
```
[
  { name: "Alice", hobbies: ["reading", "gaming"] },
  { name: "Bob", hobbies: ["swimming"] }
]
```
Output:
```
[
  { name: "Alice", hobbies: "reading" },
  { name: "Alice", hobbies: "gaming" },
  { name: "Bob", hobbies: "swimming" }
]
```

- $lookup - Performs a LEFT JOIN with another collection

```js
app.get('/users/orders', async (req, res) => {
  const usersWithOrders = await usersCollection.aggregate([
    { $lookup: {
        from: "ordersCollection",
        localField: "_id",
        foreignField: "userId",
        as: "ordersHistory"
    } }
  ]).toArray();
  res.send(usersWithOrders);
});
```

Explanation: Joins users with their orders from the orders collection.

Users Collection:
```
[
  { _id: 1, name: "Alice" },
  { _id: 2, name: "Bob" }
]
``` 
Orders Collection:
```
[
  { orderId: 101, userId: 1, product: "Laptop" },
  { orderId: 102, userId: 1, product: "Mouse" },
  { orderId: 103, userId: 2, product: "Keyboard" }
]
```
Output:
```
[
  {
    _id: 1,
    name: "Alice",
    ordersHistory: [
      { orderId: 101, userId: 1, product: "Laptop" },
      { orderId: 102, userId: 1, product: "Mouse" }
    ]
  },
  {
    _id: 2,
    name: "Bob",
    ordersHistory: [
      { orderId: 103, userId: 2, product: "Keyboard" }
    ]
  }
]
```
- $addFields - Adds new fields to documents

```js
app.get('/users/adult-flag', async (req, res) => {
  const users = await usersCollection.aggregate([
    { $addFields: { isAdult: { $gte: ["$age", 18] } } }
  ]).toArray();
  res.send(users);
});
```

Explanation: Adds a new isAdult field that checks if age >= 18.

Input:
```
[
  { name: "Alice", age: 25 },
  { name: "Bob", age: 16 },
  { name: "Charlie", age: 18 }
]
```
Output:
```
[
  { name: "Alice", age: 25, isAdult: true },
  { name: "Bob", age: 16, isAdult: false },
  { name: "Charlie", age: 18, isAdult: true }
]
```
- $count - Counts the number of documents

```js
app.get('/users/count', async (req, res) => {
  const result = await usersCollection.aggregate([
    { $match: { age: { $gte: 18 } } },
    { $count: "adultCount" }
  ]).toArray();
  res.send(result);
});
```
Explanation: Counts how many users have age >= 18.

Input:
```
[
  { name: "Alice", age: 25 },
  { name: "Bob", age: 16 },
  { name: "Charlie", age: 30 }
]
```
Output:
```
[
  { adultCount: 2 }
]
```
- $facet - Performs multiple aggregations in parallel

```js
app.get('/users/stats', async (req, res) => {
  const stats = await usersCollection.aggregate([
    { $facet: {
        "ageStats": [
          { $group: { _id: null, avgAge: { $avg: "$age" } } }
        ],
        "cityStats": [
          { $group: { _id: "$city", count: { $sum: 1 } } }
        ]
    } }
  ]).toArray();
  res.send(stats);
});
```
Explanation: Runs two different aggregations at the same time - one for age stats and one for city stats.

Input: 
```
[
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "London" },
  { name: "Charlie", age: 20, city: "New York" }
]
```
Output:
```
[
  {
    ageStats: [{ _id: null, avgAge: 25 }],
    cityStats: [
      { _id: "New York", count: 2 },
      { _id: "London", count: 1 }
    ]
  }
]
```

## Update( PATCH/PUT )

### PATCH (partial update - recommended):

#### updateOne():

```js
app.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
    );

    res.send(result);
});
```

#### updateMany():

```js
app.patch('/users/update-city', async (req, res) => {
    const { oldCity, newCity } = req.body;

    const result = await usersCollection.updateMany(
        { city: oldCity },      // find condition
        { $set: { city: newCity } } // update operation
    );

    res.send(result);
});
```

#### Patch Operators:

- $inc: Use when you want to increase or decrease a number on the document field:

```js
app.patch('/users/add-balance/:id', async (req, res) => {
    const id = req.params.id;

    const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { balance: 100 } } // for decrease use -100
    );

    res.send(result);
});
```

- $push: Use to add an item from an array in a document field:

```js
app.patch('/users/hobby/:id', async (req, res) => {
    const id = req.params.id;
    const hobby = req.body.hobby;

    const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $push: { hobbies: hobby } }
    );

    res.send(result);
});
```
- $pull: Use to remove an item from an array in a document field:

```js
app.patch('/users/hobby-remove/:id', async (req, res) => {
    const id = req.params.id;
    const hobby = req.body.hobby;

    const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $pull: { hobbies: cricket } } 
    );

    res.send(result);
});
```
- $unset: Use to Remove a Field in the document:

```js
app.patch('/users/remove-age/:id', async (req, res) => {
    const id = req.params.id;

    const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },   // find user
        { $unset: { age: "" } }      // remove the field 
    );

    res.send(result);
});
```
Note: The value of the field inside $unset doesn’t matter ("", null, 1) — anything works

- $upsert: Used to update a document if it exists, or create a new document if it does not exist. The new document will include:
- The fields from the filter (query)
- The fields from the update operation (e.g., $set)

```js
app.patch('/users/:email', async (req, res) => {
    const email = req.params.email;
    const updatedFields = req.body;

    const result = await usersCollection.updateOne(
        { email: email },        // find user by email
        { $set: updatedFields }, // update only provided fields
        { upsert: true }         // create if not exist
    );

    res.send(result);
});
```

### PUT (Full Replace):

#### replaceOne(): 

Removed missing fields

```js
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const result = await usersCollection.replaceOne(
        { _id: new ObjectId(id) },
        newData
    );

    res.send(result);
});
```
#### findOneAndReplace():
Replace a document and return it

```js
app.put('/users/replace/:id', async (req, res) => {
    const id = req.params.id;
    const newUserData = req.body;

    const result = await usersCollection.findOneAndReplace(
        { _id: new ObjectId(id) },   // find document
        newUserData,                 // completely replace with this
        { returnDocument: 'after' }  // return the replaced document
    );

    res.send(result);
});
```

## Delete(DELETE)

### deleteOne():
delete a specific document.

```js
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    res.send(result);
});
```

### deleteMany():
delete multiple items.

```js
app.delete('/users', async (req, res) => {
    const { role } = req.query;
    const result = await usersCollection.deleteMany({ role });
    res.send(result);
});
```

### findOneAndDelete():
Delete a single document that matches a filter and return the deleted document.

```js
app.delete('/users/:email', async (req, res) => {
    const email = req.params.email; // filter

    const result = await usersCollection.findOneAndDelete(
        { email: email }  
    );

    res.send(result);
});
```

## bulkWrite():
bulkWrite() allows you to perform multiple write operations (insert/update/delete) operations at once:

```js
app.post('/users/bulk-update', async (req, res) => {
    const operations = [
        // Update role for all moderators
        { updateMany: { 
            filter: { role: "moderator" }, 
            update: { $set: { role: "senior-moderator" } } 
        }},

        // Update role for a specific user
        { updateOne: { 
            filter: { email: "user1@gmail.com" }, 
            update: { $set: { role: "admin" } } 
        }},

        // Delete inactive users
        { deleteMany: { filter: { status: "inactive" } } }
    ];

    const result = await usersCollection.bulkWrite(operations);

    res.send(result);
});
```

## Difference Between req.body, req.params and req.query:

- req.body → used when we need requested body info:

Frontend:

```js
fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: { 
    'content-type': 'application/json' 
  },
  body: JSON.stringify({ name: "Tamim", email: "a@a.com" })
})
```

Backend: 

```js
app.post('/users', async (req, res) => {
    const newUser = req.body;
    console.log(newUser) // { name: "Tamim", email: "a@a.com" }
    const result = await usersCollection.insertOne(newUser);
    res.send(result); 
});
```

- req.params → used when we need requested url dynamic url path:

```js
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.findOne(query);
    res.send(result);
});
```

- req.query → used when we need requested url part after ?

```js
app.get('/users', async (req, res) => {
    const page = parseInt(req.query.page); // http://localhost:3000/users?page=${page}
    const limit = 5;
    const skip = (page - 1) * limit;

    const result = await usersCollection
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();

    res.send(result);
});
```


# Part 4: Node + Express + MongoDB:

## setup:

**step 1:** 

```bash
npm init -y
```
**step 2:** 

```bash
npm i express mongodb nodemon cors dotenv
```

Note: 
- nodemon automatically restarts the server whenever we make code changes.
- cors allows cross-origin requests, useful when frontend and backend run on different ports or domains.
- dotenv lets us store sensitive data (like MongoDB URI or passwords) in a .env file and access them using process.env, keeping our project secure and preventing secrets from going to GitHub.

**step 3:** 

```js
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 3000

const app = express()
app.use(cors()) // use cors middleware
app.use(express.json()) // use express middleware


const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    await client.connect();

    // const database = client.db("userdb")
    // const usersCollection = database.collection('users')
    const usersCollection = client.db("userdb").collection('users')


    /*
    
    ALl CRUD Operation here  
    
    */

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
Note: Middleware in Express is a function that runs between the request and the response. It can modify the request, check something, or run some logic before sending the final response.

**step 4:** 

`"start": "node index.js"`: Many deployment platforms (like Render, Vercel, Railway, Heroku) automatically look for this script and They use this command to run your server., if we don't include it, deployment will fail because the platform doesn't know hot to start your app.

```js
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "mongodb": "^7.0.0",
    "nodemon": "^3.1.11"
  }
}
```




## Examples:

### Example 1:

Backend:

```js
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 3000

const app = express()
app.use(cors()) // use cors middleware
app.use(express.json()) // use express middleware


const uri = "mongodb+srv://db-user:HSVPnZLwfnPGPjAB@cluster0.ec7ovco.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {

    await client.connect();

    const notesCollection = client.db("crudDB").collection('notes')


    // POST - create new note
    app.post('/notes', async (req, res) => {
        const note = req.body;
        const result = await notesCollection.insertOne(note);
        res.send(result);
    });


    // GET all notes
    app.get('/notes', async (req, res) => {
        const notes = await notesCollection.find({}).toArray();
        res.send(notes);
    });

    // GET a single note
    app.get('/notes/:id', async (req, res) => {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }
        const result = await notesCollection.findOne(filter);
        res.send(result);
    });


    // PATCH - partial update
    app.patch('/notes/:id', async (req, res) => {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }
        const updatedData = req.body;
        const updateDoc = {
            $set: frontendUpdatedData
        }

        const result = await notesCollection.updateOne(filter, updatedDoc);
        res.send(result);
    });

    // PUT - full replace
    app.put('/notes/:id', async (req, res) => {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }
        const updatedData = req.body;
        const options = { upsert: true }

        const result = await notesCollection.replaceOne(filter, updatedData, options);
        res.send(result);
    });


    // DELETE
    app.delete('/notes/:id', async (req, res) => {
        const result = await notesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.send(result);
    });


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

Frontend:

```jsx
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Link } from 'react-router';

const App = () => {

  const [notes, setNotes] = useState()
  const [singleNotes, setSingleNotes] = useState(null)
  const [patchData, setPatchData] = useState(null)
  const [putData, setPutData] = useState(null)

  const [viewDetailsDialog, setViewDetailsDialog] = useState(false)
  const [patchDialog, setPatchDialog] = useState(false)
  const [putDialog, setPutDialog] = useState(false)
  const [id, setId] = useState()

  // send data to db
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const description = e.target.description.value
    const singleNoteObj = { name, description }

    fetch('http://localhost:3000/notes',
      {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(singleNoteObj)
      })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success("Note Added")
          e.target.reset()
          console.log(data)
          singleNoteObj._id = data.insertedId
          setNotes([...notes, singleNoteObj])
        }
      })
  }


  // get all data form db
  useEffect(() => {
    fetch('http://localhost:3000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])


  // get single data form db
  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3000/notes/${id}`)
      .then(res => res.json())
      .then(data => setSingleNotes(data))
  }, [id])


  // update selected object partial data
  const handlePatchUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const description = e.target.description.value
    const patchObj = { name, description }

    fetch(`http://localhost:3000/notes/${id}`,
      {
        method: "PATCH",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(patchObj)
      })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          toast.success("Note Updated(PATCH)")
          console.log(data)

          const updatedNotes = notes.map((note) => note._id === id ? { ...note, ...patchObj } : note)

          setNotes(updatedNotes)
          setPatchDialog(false)
        }
      })
  }


  // replace selected object full data
  const handlePutUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const description = e.target.description.value
    const putObj = { name, description }

    fetch(`http://localhost:3000/notes/${id}`,
      {
        method: "PUT",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(putObj)
      })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          toast.success("Note Updated(PATCH)")
          console.log(data)

          const updatedNotes = notes.map((note) => note._id === id ? { ...note, ...putObj } : note)

          setNotes(updatedNotes)
          setPutDialog(false)
        }
      })
  }


  // delete data form db
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          console.log(data)
          toast.success("Note Deleted")

          const remainingNotes = notes.filter((note) => note._id !== id)
          setNotes(remainingNotes)
        }
      })
  }
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notes CRUD UI</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input type="text" name="name" placeholder="Name" className="input w-full" />
        <input type="text" name="description" placeholder="Description" className="input w-full" />
        <input type="submit" value="Submit" className='btn w-full btn-primary' />
      </form>

      {/* Notes */}
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <tbody>
            {notes?.map((note) => (
              <tr key={note._id}>
                <td>{note._id}</td>
                <td>{note.name}</td>
                <td>{note.description}</td>
                <td className="space-x-2">
                  {/* <Link to={`view-details/${note._id}`}><button className="btn btn-sm btn-accent">View Details</button></Link> */}
                  <button className="btn btn-sm btn-accent" onClick={() => {
                    setViewDetailsDialog(true)
                    setId(note._id)
                  }}>View Details</button>
                  <button className="btn btn-sm btn-warning" onClick={() => {
                    setPatchDialog(true)
                    setId(note._id)
                    setPatchData({ name: note.name, description: note.description })
                  }}>PATCH Update</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => {
                    setPutDialog(true)
                    setId(note._id)
                    setPutData({ name: note.name, description: note.description })
                  }}>PUT Replace</button>
                  <button onClick={() => handleDelete(note._id)} className="btn btn-sm btn-error">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* view details dialog */}
      <Dialog open={viewDetailsDialog} onClose={() => setViewDetailsDialog(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <p>id: {singleNotes?._id}</p>
            <p>Name: {singleNotes?.name}</p>
            <p>Name: {singleNotes?.description}</p>
            <div className="flex gap-4">
              <button onClick={() => setViewDetailsDialog(false)} className='btn bg-error'>Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* patch dialog */}
      <Dialog open={patchDialog} onClose={() => setPatchDialog(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">PATCH Update</DialogTitle>

            <form onSubmit={handlePatchUpdate} className="mb-6 space-y-4">
              <input type="text" name="name" value={patchData?.name} onChange={(e) => setPatchData({ ...patchData, name: e.target.value })} className="input w-full" />
              <input type="text" name="description" value={patchData?.description} onChange={(e) => setPatchData({ ...patchData, description: e.target.value })} className="input w-full" />
              <input type="submit" value="Submit" className='btn w-full btn-primary' />
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* put dialog */}
      <Dialog open={putDialog} onClose={() => setPutDialog(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">PUT Replace</DialogTitle>
            <form onSubmit={handlePutUpdate} className="mb-6 space-y-4">
              <input type="text" name="name" value={putData?.name} onChange={(e) => setPutData({ ...putData, name: e.target.value })} className="input w-full" />
              <input type="text" name="description" value={putData?.description} onChange={(e) => setPutData({ ...putData, description: e.target.value })} className="input w-full" />
              <input type="submit" value="Submit" className='btn w-full btn-primary' />
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
```



![image](./images/crud-operation.png)

### Example 2:

Backend:

```js
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 3000

const app = express()
app.use(cors()) // use cors middleware
app.use(express.json()) // use express middleware


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
    const usersCollection = client.db("userdb").collection('users')

    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
    });

    app.get('/users', async (req, res) => {
        const cursor = usersCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/users/:id', async (req, res) => {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }
        const result = await usersCollection.findOne(filter)
        res.send(result)
    })

    app.Patch('/users/:id', async (req, res) => {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }
        const user = req.body

        const updateDoc = {
            $set: {
                name: user.name,
                email: user.email
            }
        }
        const options = { upsert: true }

        const result = await usersCollection.updateOne(filter, updateDoc, options)
        res.send(result)
    })

    app.delete('/users/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await usersCollection.deleteOne(query)
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

Frontend: 

```jsx
// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layout/MainLayout';
import App from './App';
import UserDetails from './components/UserDetails';
import UpdateUser from './components/UpdateUser';


const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: App
      },
      {
        path: '/userDetails/:id',
        Component: UserDetails,
        loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
        hydrateFallbackElement: <p>Loading..........</p>
      },
      {
        path: '/updateUser/:id',
        Component: UpdateUser,
        loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
        hydrateFallbackElement: <p>Loading..........</p>
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
```

```jsx
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;
```

```jsx
import React from 'react';
import Users from './components/Users';

const usersPromise = fetch('http://localhost:3000/users').then(res => res.json())

const App = () => {
    return (
        <div>
            <Users usersPromise={usersPromise}></Users>
        </div>
    );
};

export default App;
```

```jsx
import React from 'react';
import { useState } from 'react';
import { use } from 'react';
import { Link } from 'react-router';

const Users = ({ usersPromise }) => {

    const initialUsers = use(usersPromise)
    const [users, setUsers] = useState(initialUsers)

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const newUser = { name, email }

        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    newUser._id = data.insertedId
                    const newUsers = [...users, newUser]
                    setUsers(newUsers)

                    alert("User Added Successfully")
                    console.log(data)
                    e.target.reset()
                }
            })
    }


    const handleDelete = (id) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const remainingUsers = users.filter((user) => user._id !== id)
                    setUsers(remainingUsers)

                    alert("User deleted successfully")
                    console.log(data)
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" className='input' /><br />
                <input type="email" name="email" className='input' /><br />
                <input type="submit" value="Summit" className='btn' />
            </form>

            {/* view users */}
            <div>
                {users.map((user) =>
                    <p key={user._id}>
                        {user.name} | {user.email}
                        <button onClick={() => handleDelete(user._id)} className='btn btn-xs'>X</button>
                        <Link to={`/userDetails/${user._id}`} className='btn btn-xs'>Details</Link>
                        <Link to={`/updateUser/${user._id}`} className='btn btn-xs'>Update</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Users;
```

```jsx
import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetails = () => {
    const user = useLoaderData()
    console.log(user)
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    );
};

export default UserDetails;
```

```jsx
import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData()

    const handleUpdate = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const updatedUser = { name, email }

        fetch(`http://localhost:3000/users/${user._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    alert("User updated Successfully")
                    console.log(data)
                }
            })

    }

    return (
        <form onSubmit={handleUpdate}>
            <input type="text" name="name" className='input' defaultValue={user.name} /><br />
            <input type="email" name="email" className='input' defaultValue={user.email} /><br />
            <input type="submit" value="Summit" className='btn' />
        </form>
    );
};

export default UpdateUser;
```

![image](./images/crud-operation2.png)

## Others:
### Different way to  Accessing form data:

#### Manual accessing:

```js
const name = e.target.name.value
const email = e.target.email.value
const phone = e.target.phone.value
const address = e.target.address.value
const data = {name, email, phone, address}
```

#### Using formData():
we can simplify the process using the FormData constructor. FormData automatically collects all input values from the form, and we can easily convert them into a plain JavaScript object using Object.fromEntries():

```js
const form = e.target
const formData = new FormData(form)
const email = formData.get('email')
const password = formData.get('password')
console.log(email, password)
```

```js
const form = e.target;
const formData = new FormData(form)
const coffeeData = Object.fromEntries(formData.entries())
console.log(coffeeData)
```



# Part 5: PostgreSQL:

# Part 6: Node + Express + PostgreSQL:

## Example:
### Example 1:

**Setup:**

```js
npm init -y
npm i express pg
npm i -D typescript tsx
npm i --save-dev @types/express @types/pg
tsc --init
```

```js
// tsconfig.json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",
    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node
    // Other Outputs
    // "sourceMap": true,
    // "declaration": true,
    // "declarationMap": true,
    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,
    // Recommended Options
    "strict": true,
    // "jsx": "react-jsx",
    // "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}
```

```js
{
  "name": "module-12",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "npx tsx watch ./src/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "pg": "^8.16.3"
  },
  "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/pg": "^8.15.6",
    "tsx": "^4.21.0"
  }
}
```

Server: 

```js
import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString:
        "postgresql://neondb_owner:npg_im9BKnCTq3Wh@ep-withered-hill-a1myvxbl-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)`)
}
initDB()

// CREATE note
app.post("/notes", async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;

        const result = await pool.query(
            "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET all notes
app.get("/notes", async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET single note
app.get("/notes/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// PATCH note
app.patch("/notes/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;

        const result = await pool.query(
            "UPDATE notes SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING *",
            [title, content, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// PUT note
app.put("/notes/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;

        const result = await pool.query(
            "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
            [title, content, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// DELETE note
app.delete("/notes/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        await pool.query("DELETE FROM notes WHERE id = $1", [id]);

        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ error });
    }
});


app.get("/", (req: Request, res: Response) => {
    res.send("PostgreSQL + TypeScript API is running!");
});

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Route not found",
        path: req.originalUrl,
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```
