require('dotenv').config()

const express = require('express')
const http = require('http')
const app = express()

// mongo DB set up
const MongoClient = require('mongodb').MongoClient
let db
let dbConnectionStr = process.env.DB_STRING
let dbName = 'todolist'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`connected to ${dbName} database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => 
    // db.collection('todo').find().toArray()
    //     .then(data => res.render('index.ejs', {list: data} ))
    res.render('index.ejs')
 )

 app.post('/addListItem', (req, res) => {
    db.collection('todo').insertOne({'listItem': req.body.listItem, 'completed': false})
    res.redirect('/')
 })

 app.delete('/deleteItem', (req, res) => {
     db.collection('todo').deleteOne({listItem: req.body.deleteItem.trim()})
        .then(() => res.json())
 })


const PORT = 5002
app.listen(process.env.PORT || PORT, () => console.log(`Running on ${PORT}`))
