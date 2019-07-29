var express = require('express')
var router = express.Router()
var controllerUsers = require('../controllers/users');
var httpStatusCodes = require('http-status-codes')
var jwt = require('jsonwebtoken');

router.post('/', async function(req, res, next) {
  let record = await controllerUsers.login(req.body)
  if(record.length === 0){
    res.status(httpStatusCodes.BAD_REQUEST).send({"code": httpStatusCodes.BAD_REQUEST, "message": "Bad request"})
  }else{
    let token = await jwt.sign({data: 'foobar'}, process.env.JWT_SECRET, { expiresIn: '1h' });
    await controllerUsers.saveNewToken(record[0].id, token)
    res.send({token: token})
  }
})

module.exports = router
