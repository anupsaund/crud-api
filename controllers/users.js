var User = require('../model/userModel');

exports.login = (request) => {
   return User.findUserByUsernamePassword(request.username, request.password)
};

exports.saveNewToken = (userId, token) =>{
   return User.updateUserToken(userId, token)
}