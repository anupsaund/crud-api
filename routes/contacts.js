var express = require('express')
var router = express.Router()
var controllerContacts = require('../controllers/contacts')
var _ = require('lodash')

router.get('/', async (req, res, next) => {
  let obj = await controllerContacts.getAll(req.userId)
  let results = new Array()

  obj.forEach( (row) =>{
    let mapped = _.mapKeys(row, (v, k) => _.camelCase(k))  
    results.push(mapped)
  })
  
  res.send(results)
})

router.post('/', async (req, res, next) => {
  let obj = await controllerContacts.createContact(req.userId, req.body)
  const mapped = _.mapKeys(obj, (v, k) => _.camelCase(k))
  res.send(mapped)
})

router.get('/:id', async (req, res, next) => {

  let obj = await controllerContacts.getById(req.params.id)
  const mapped = _.mapKeys(obj[0], (v, k) => _.camelCase(k))
  res.send(mapped)
})

router.put('/:id', async (req, res, next) => {
  let obj = await controllerContacts.putById(req.userId, req.params.id, req.body)
  const mapped = _.mapKeys(obj, (v, k) => _.camelCase(k))
  res.send(mapped)
})

router.delete('/:id', async (req, res, next) => {
  let obj = await controllerContacts.deleteById(req.userId, req.params.id)
  res.send({"message": "Deleted"});
})

module.exports = router

