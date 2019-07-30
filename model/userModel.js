var sql = require('./db');

var User = function(user){
    // this.userId = user.id;
    // this.status = task.status;
    // this.created_at = new Date();
};

User.findUserByUsernamePassword = (username, password) => {
    return new Promise((resolve, reject) =>{
        sql.query("Select * from users where username = ? and password = ?",[username, password], function (err, res) {
            if(err) {
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    })
}

User.updateUserToken = (userId, token) =>{
    return new Promise((resolve, reject) =>{
        sql.query("update users set authtoken = ? where id = ?",[token, userId], function (err, res) {
            if(err) {
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    })
}

User.checkToken = (token) => {
    return new Promise((resolve, reject) =>{
        sql.query("select * from users where authtoken = ?",token, function (err, res) {
            if(err) {
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    })
}

module.exports= User;