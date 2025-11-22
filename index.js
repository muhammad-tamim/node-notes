const express = require('express')
var cors = require('cors')
const phones = require('./phones.json');
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/phones", (req, res) => {
    res.send(phones);
})

app.get('/phones/:id', (req, res) => {
    const id = parseInt(req.params.id);

    console.log(typeof id)

    const phone = phones.find(p => p.id === id);

    res.send(phone)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
