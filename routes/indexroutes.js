const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexcontroller')

router.get('/', indexController.indexGet)

module.exports = router