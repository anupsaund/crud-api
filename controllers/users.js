var User = require('../model/appModel.js');

exports.login = (request) => {
   return User.findUserByUsernamePassword(request.username, request.password)
};

exports.saveNewToken = (userId, token) =>{
   return User.updateUserToken(userId, token)
}