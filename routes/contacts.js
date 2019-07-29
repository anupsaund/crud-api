var express = require('express')
var router = express.Router()
var controllerUsers = require('../controllers/users');

router.post('/', function(req, res, next) {
  let obj = controllerUsers.listContacts()
  res.send(obj)
})

module.exports = router
