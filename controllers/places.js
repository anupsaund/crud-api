var Places = require('../model/placeModel.js')

exports.getAll = async (userId) => {
   return await Places.findAll(userId)
}
exports.createPlace = async (userId, body) => {
   return await Places.createOne(userId, body)
}
exports.getById = async (id) => {
   return await Places.getById(id)
}
exports.putById = async (userId, id, body) => {
   return await Places.updateOne(userId, id, body)
}
exports.deleteById = async (userId, id) => {
   return await Places.deleteById(userId, id)
}
