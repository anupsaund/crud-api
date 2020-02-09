var express = require('express')
var router = express.Router()
var controllerContacts = require('../controllers/places')
var camelCase = require('lodash.camelcase')
var _ =  require('lodash.mapkeys')

router.get('/', async (req, res, next) => {
  let obj = await controllerContacts.getAll(req.userId)
  let results = new Array()

  obj.forEach( (row) =>{
    let mapped = _(row, (v, k) => camelCase(k))  
    results.push(mapped)
  })
  
  res.send(results)
})

router.post('/', async (req, res, next) => {
  let obj = await controllerContacts.createPlace(req.userId, req.body)
  const mapped = _(obj, (v, k) => camelCase(k))
  res.send(mapped)
})

router.get('/:id', async (req, res, next) => {

  let obj = await controllerContacts.getById(req.params.id)
  const mapped = _(obj[0], (v, k) => camelCase(k))
  res.send(mapped)
})

router.put('/:id', async (req, res, next) => {
  let obj = await controllerContacts.putById(req.userId, req.params.id, req.body)
  const mapped = _(obj, (v, k) => camelCase(k))
  res.send(mapped)
})

router.delete('/:id', async (req, res, next) => {
  let obj = await controllerContacts.deleteById(req.userId, req.params.id)
  res.send({"message": "Deleted"});
})

module.exports = router

