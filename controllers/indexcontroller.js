// import mongoose module and import model file

let TodoList = require('../models/todo')

module.exports = {

indexGet: (req, res) => 
    TodoList.find()
        .then(data => res.render('index.ejs', {list: data} ))

}