var User = require('../model/userModel.js')
var jwt = require('jsonwebtoken')

exports.checkToken = (token) =>{
   return new Promise( async (resolve, reject) =>{
      let record = await User.checkToken(token)
      if(record.length ===0) {

       resolve(false)
      }

      jwt.verify(record[0].authtoken, process.env.JWT_SECRET, (err, decoded) => {
         if (err) {
            if(err.name == TokenExpiredError)
             resolve(false)
         }else{
            resolve(record[0].id) // pass the userId back and persist it on the request object
         }
       });
   })
      
}