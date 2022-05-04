const express = require('express')
const http = require('http')
const app = express()
app.set('view engine', 'ejs')

console.log('server up')

app.get('/', (req, res) => 
    res.render('index.ejs')
 )


const PORT = 5002
app.listen(process.env.PORT || PORT, () => console.log(`Running on ${PORT}`))