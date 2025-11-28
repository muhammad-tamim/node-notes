const express = require('express')
const { MongoClient } = require('mongodb');

const port = 3000

const app = express()
app.use(express.json())

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
    const coffeeCollection = client.db("coffeedb").collection('coffees');


    app.get('/coffees', async (req, res) => {
        const result = await coffeeCollection.find().toArray()
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})