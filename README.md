<h1 align="center">Node Notes</h1>

# Part 1: Node.js
# Part 2: Express.js
## Introduction to express.js  
## How to install express.js: 
- step 1: 

```bash
npm init -y
```
- step 2: 

```bash
npm i express nodemon cors
```

Note: 
- we use nodemon here, because it automatically restarts the server when we make changes to the code. 
- we use cors here, because it allows cross-origin requests. It is useful when your frontend and backend are running on different ports or domains.

- step 3: 

```js
const express = require('express') 
const cors = require('cors')
const port = 3000

const app = express()
app.use(cors()) // use cors middleware

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// app.listen(port)
```

here, 
- `const express = require('express')`: import the express module. but we can use ES6 module `import express from 'express'` if we use that we have to change our `type: commonjs` to  `type: module` in package.json.

- `const app = express()`: creates an Express application instance that you’ll use to define routes and middleware.

- `const port = 3000`: sets the port number. the server will run/listen on this port.

- `app.get('/', (req, res) => { res.send('Hello World!') })`: defines a route for the root URL (/). When someone sends a GET request, it responds with "Hello World!".

- `app.listen(port, () => {...})`: starts the server on our specified port and logs a message in the console when the server is running.

- step 4: load and show data and dynamic data

```jsx
// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Phones from './components/Phones';
import SinglePhone from './components/SinglePhone';


const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home Page</h1>,
  },
  {
    path: '/phones',
    Component: Phones,
    loader: () => fetch('http://localhost:3000/phones')
  },
  {
    path: '/phones/:id',
    Component: SinglePhone,
    loader: ({ params }) => fetch(`http://localhost:3000/phones/${params.id}`)
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
```

```jsx
import React from 'react';
import { Link, useLoaderData } from 'react-router';

const Phones = () => {
    const phones = useLoaderData()
    console.log(phones)
    return (
        <div>
            {phones.map((p) => <Link key={p.id} to={`/phones/${p.id}`}><h2>{p.brand}</h2></Link>)}
        </div>
    );
};

export default Phones;
```

```jsx
import React from 'react';
import { useLoaderData } from 'react-router';

const SinglePhone = () => {
    const phones = useLoaderData();
    const { id, brand, model, price } = phones
    return (
        <div>
            <h1>{id}</h1>
            <h2>{brand}</h2>
            <h2>{model}</h2>
            <h2>{price}</h2>
        </div>
    );
};

export default SinglePhone;
```