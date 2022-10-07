//import
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const dotenv = require('dotenv').config()
const { MongoClient } = require('mongodb')

//middleware
app.use(cors())
app.use(express.json())

//GET request
app.get('/users', async (req, res) => {
  //connect to mongoDB
  const client = new MongoClient(process.env.MONGO_URI)
  await client.connect()
  //query all user information
  const users = await client.db('employeeListDB').collection('users').find({}).toArray()
  client.close()
  res.status(200).send(users)
})

//GET request by ID
app.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    //connect to mongoDB
    const client = new MongoClient(process.env.MONGO_URI)
    await client.connect()
    //query all user information
    const user = await client.db('employeeListDB').collection('users').findOne({"id": id})
    client.close()
    res.status(200).send({
        "status": "Ok",
        "user": user
    })
  })

//POST request
app.post('/users/create', async (req, res) => {
    const user = req.body
    //connect to mongoDB
    const client = new MongoClient(process.env.MONGO_URI)
    await client.connect()
    //insert data to database
    await client.db('employeeListDB').collection('users').insertOne({
        id: parseInt(user.id),
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        avatar: user.avatar
    })
    await client.close()

    //check if data created successful or not
    res.status(200).send({
        "status": "Ok",
        "message": "Create user successfully"
    })
})

//listen
app.listen(port, () => {
  console.log(`Employee lists app listening on port ${port}`)
})