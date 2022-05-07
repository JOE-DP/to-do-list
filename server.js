// installed and then import dotenv module, which lets me import variables from .env meaning I can keep sensitive information out of my main code. It is important to configure this in Heroku, which I did using the Heroku GUI

require('dotenv').config()

// import mongoose module and import model file

let mongoose = require('mongoose')
let TodoList = require('./models/todo')

// installed and import express module, which is a framework which allows me to create CRUD requests and responses in a streamlined way

const express = require('express')

// http is a core node module, I have imported the http module. This module allows data transfer over http and is used by express in this app. This allows information to be sent between the server and the client.

const http = require('http')

// this line creates a new express app to be used throught the serverside code

const app = express()

// mongo DB set up
// const MongoClient = require('mongodb').MongoClient
// let db
let dbConnectionStr = process.env.DB_STRING
// let dbName = 'todolist'

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology : true})
//     .then(client => {
//         console.log(`connected to ${dbName} database`)
//         db = client.db(dbName)
//     })

    mongoose.connect(dbConnectionStr, () => console.log('mongoose connected'));


// this sets the view engine to EJS, so the app knows to read the views files as EJS when app.render() is called

app.set('view engine', 'ejs')

//static allows app to serve static files which are stored in the /public folder

app.use(express.static('public'))

//express.urlencoded() allows app to read the url data in the request as a string

app.use(express.urlencoded({extended: true}))

//express.json() allows the app to view the incoming req data as a JSON object. e.g. req.body

app.use(express.json())

app.get('/', (req, res) => 
    TodoList.find()
        .then(data => res.render('index.ejs', {list: data} ))
 )

 app.post('/addListItem', async (req, res) => {
    // db.collection('todo').insertOne({'listItem': req.body.listItem, 'completed': 0})
    await TodoList.create({todo: req.body.listItem})
    res.redirect('/')
 })

 app.put('/modifyComplete', async (req, res) => {

    let objNumArr = await TodoList.find()
    let objNum = await objNumArr.filter(item => item.todo == req.body.modifyItem.trim())

    TodoList.updateOne({todo: req.body.modifyItem.trim()}, { $set:{
        completed: Number(objNum[0].completed) + 1
    }})
    .then(() => res.json())
 })


 app.delete('/deleteItem', (req, res) => {
     TodoList.deleteOne({listItem: req.body.deleteItem.trim()})
        .then(() => res.json())
 })


const PORT = 5003
app.listen(process.env.PORT || PORT, () => console.log(`Running on ${PORT}`))
