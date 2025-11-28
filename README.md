<h1 align="center">Node.js Notes</h1>

- [Part 1: Node.js:](#part-1-nodejs)
  - [Introduction:](#introduction)
    - [How Node.js Processes a Request:](#how-nodejs-processes-a-request)
    - [What can node.js do:](#what-can-nodejs-do)
    - [Node.js vs Browser:](#nodejs-vs-browser)
    - [hello world on Node.js  server:](#hello-world-on-nodejs--server)
    - [Common Architecture:](#common-architecture)
    - [How Web Works:](#how-web-works)
  - [Node.js Modules:](#nodejs-modules)
    - [Types of Modules:](#types-of-modules)
    - [Types of Module Systems:](#types-of-module-systems)
- [Part 2: Express.js:](#part-2-expressjs)
- [Part 3: MongoDb:](#part-3-mongodb)
- [Part 4: Node.js + Express.js + MongoDB:](#part-4-nodejs--expressjs--mongodb)
  - [Introduction:](#introduction-1)
    - [setup:](#setup)
    - [How a api code works in node+express+mongodb:](#how-a-api-code-works-in-nodeexpressmongodb)
  - [CRUD Operation:](#crud-operation)
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
    - [Examples:](#examples)
      - [Example 1:](#example-1)
      - [Example 2:](#example-2)
    - [Others:](#others)
      - [Different way to  Accessing form data:](#different-way-to--accessing-form-data)
        - [Manual accessing:](#manual-accessing)
        - [Using formData():](#using-formdata)


# Part 1: Node.js: 
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

### hello world on Node.js  server:

```js
let http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World!');
}).listen(8080);
```
here,
- let http = require('http'): 
  - Imports the build-in http module in Node.js, its allows us to handle http request
- http.createServer(): Creates a new HTTP server.
- res.writeHead(200, { 'Content-Type': 'text/html' }):Sends HTTP headers to the client and tells the browser that the response is html with ok(200) status.
- res.end('Hello World!'): Sends the response body to the client and closes the connection.



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




## Node.js Modules:
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


# Part 2: Express.js:

# Part 3: MongoDb:

# Part 4: Node.js + Express.js + MongoDB:
## Introduction:
### setup:

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

### How a api code works in node+express+mongodb:

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


## CRUD Operation:

| Operation  | HTTP Method   | Meaning          |
| ---------- | ------------- | ---------------- |
| **Create** | `POST`        | Add new document |
| **Read**   | `GET`         | Fetch document   |
| **Update** | `PUT / PATCH` | Modify document  |
| **Delete** | `DELETE`      | Remove document  |

- PUT = Replaces the entire document with the new data.
- PATCH = Updates only specific fields without touching others field of the document.

Note: In the context of MongoDB, a document is basically a single record in a collection, similar to a row in a SQL database.


```
SQL                      MongoDB
------------------       -------------------
Database                 Database
  └── Table                └── Collection
        └── Row                  └── Document
              └── Column               └── Field

```


### Create(POST)
#### insertOne():
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

#### insertMany():
Insert multiple documents

```js
app.post('/users/bulk', async (req, res) => {
    const users = req.body; // array of objects
    const result = await usersCollection.insertMany(users);
    res.send(result);
});
```

### Read(GET)

#### find(): 
Get all data:

```js
app.get('/users', async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
});
```

note: find() returns a **cursor**, so you need to use .toArray() methods to convert the cursor to array. 

##### cursor:
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

#### findOne():
Get a single item by ID:

```js
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.findOne(query);
    res.send(result);
});
```

#### countDocuments():
returns a number after Counting matching documents

```js
app.get('/users', async (req, res) => {
    const role = req.query.role; // GET http://localhost:3000/users?role=user
    const total = await usersCollection.countDocuments({ role });
    res.send( total );
});
```

#### distinct():
Returns an array of unique values of a specific field/key:

```js
// GET /users/roles
app.get('/users/roles', async (req, res) => {
    const roles = await usersCollection.distinct("role");
    res.send( roles );
});
```

#### aggregate() and Pipeline:
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

##### Common Aggregation Stages:

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

### Update( PATCH/PUT )

#### PATCH (partial update - recommended):

##### updateOne():

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

##### updateMany():

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

##### Patch Operators:

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

#### PUT (Full Replace):

##### replaceOne(): 

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
##### findOneAndReplace():
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

### Delete(DELETE)

#### deleteOne():
delete a specific document.

```js
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    res.send(result);
});
```

#### deleteMany():
delete multiple items.

```js
app.delete('/users', async (req, res) => {
    const { role } = req.query;
    const result = await usersCollection.deleteMany({ role });
    res.send(result);
});
```

#### findOneAndDelete():
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

### bulkWrite():
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

### Difference Between req.body, req.params and req.query:

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


### Examples:

#### Example 1:

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

#### Example 2:

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

### Others:
#### Different way to  Accessing form data:

##### Manual accessing:

```js
const name = e.target.name.value
const email = e.target.email.value
const phone = e.target.phone.value
const address = e.target.address.value
const data = {name, email, phone, address}
```

##### Using formData():
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


