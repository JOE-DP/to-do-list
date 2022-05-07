const mongoose = require('mongoose')

let todoSchema = new mongoose.Schema({
    todo:{
        type: String
    }, 
    createdAt:{
        type: Date, 
        default: () => Date.now()
        
    },
    completed: {
        type: Number, 
        default: 0
    }
})

module.exports =mongoose.model('todoList', todoSchema)