// import mongoose module and import model file

let TodoList = require('../models/todo')

module.exports = {

todoPost: async (req, res) => {
    await TodoList.create({todo: req.body.listItem})
    res.redirect('/')

}, 

todoComplete: async (req, res) => {

   let objNumArr = await TodoList.find()
   let objNum = await objNumArr.filter(item => item.todo == req.body.modifyItem.trim())

   TodoList.updateOne({todo: req.body.modifyItem.trim()}, { $set:{
       completed: Number(objNum[0].completed) + 1
   }})
   .then(() => res.json())
}, 
    deleteItem: (req, res) => {
        console.log(req.body.deleteItem.trim())
     TodoList.findOneAndDelete({todo: req.body.deleteItem.trim()})
        .then(() => res.json())
 }, 
 
 todoIndexGet: (req, res) => 
    TodoList.find()
        .then(data => res.render('todoindex.ejs', {list: data} ))

}