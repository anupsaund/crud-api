var Contacts = require('../model/contactModel.js')

exports.getAll = async (userId) => {
   return await Contacts.findAll(userId)
}
exports.createContact = async (userId, body) => {
   return await Contacts.createOne(userId, body)
}
exports.getById = async (id) => {
   return await Contacts.getById(id)
}
exports.putById = async (userId, id, body) => {
   return await Contacts.updateOne(userId, id, body)
}
exports.deleteById = async (userId, id) => {
   return await Contacts.deleteById(userId, id)
}
