const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todocontroller')

router.post('/addListItem', todoController.todoPost)
router.put('/modifyComplete', todoController.todoComplete)
router.delete('/deleteItem', todoController.deleteItem )




module.exports = router
