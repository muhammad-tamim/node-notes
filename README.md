## setup node+express+mongodb:
**step 1:** 

```bash
npm init -y
```
**step 2:** 

```bash
npm i express mongodb nodemon cors 
```

Note: 
- we use nodemon here, because it automatically restarts the server when we make changes to the code. 
- we use cors here, because it allows cross-origin requests. It is useful when your frontend and backend are running on different ports or domains.

**step 3:** 

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

## CRUD Operation:

| Operation  | HTTP Method   | Meaning              |
| ---------- | ------------- | -------------------- |
| **Create** | `POST`        | Add new data         |
| **Read**   | `GET`         | Fetch data           |
| **Update** | `PUT / PATCH` | Modify existing data |
| **Delete** | `DELETE`      | Remove data          |

Note: 
- PUT = Replace entire data with new data
- PATCH = Update only some part of the data

### Examples:

**Example 1:**

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
        const query = { _id: new ObjectId(id) }
        const result = await notesCollection.findOne(query);
        res.send(result);
    });


    // PATCH - partial update
    app.patch('/notes/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: new Object(id) }
        const frontendUpdatedData = req.body;
        const updatedDoc = {
            $set: frontendUpdatedData
        }

        const result = await notesCollection.updateOne(query, updatedDoc);
        res.send(result);
    });

    // PUT - full replace
    app.put('/notes/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const frontendUpdatedData = req.body;
        const options = { upsert: true }

        const result = await notesCollection.replaceOne(query, frontendUpdatedData, options);
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

**Example 2:**

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
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
    });


    app.get('/users', async (req, res) => {
        const cursor = usersCollection.find()
        const users = await cursor.toArray()
        res.send(users)
    })
    app.get('/users/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await usersCollection.findOne(query)
        res.send(result)
    })

    app.put('/users/:id', async (req, res) => {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }
        const user = req.body

        const updatedDoc = {
            $set: {
                name: user.name,
                email: user.email
            }
        }
        const options = { upsert: true }

        const result = await usersCollection.updateOne(filter, updatedDoc, options)
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