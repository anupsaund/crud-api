var sql = require('./db');

var Place = function(place){
    // this.userId = user.id;
    // this.status = task.status;
    // this.created_at = new Date();
};

Place.findAll = (userId) => {
    return new Promise((resolve, reject) =>{
        sql.query("Select * from places where user_id = ?", userId, (err, res) => {
            if(err) {
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    })
}

Place.createOne = (userId, body) => {

    let placeName  = (body.placeName? body.placeName: '')
    let longitude  = (body.longitude? body.longitude: '')
    let latitude   = (body.latitude? body.latitude: '')

    return new Promise((resolve, reject) =>{
        sql.query("Insert into places (user_id, place_name, longitude, latitude) values (?,?,?,?)", [userId, placeName, longitude, latitude], async (err, res) => {
            if(err) {
                reject(err)
            }
            else{
                let record = await Place.getById(res.insertId)
                resolve(record[0])
            }
        });
    })
}

Place.updateOne = (userId, id, body) => {

    let placeName  = (body.placeName? body.placeName: '')
    let longitude  = (body.longitude? body.longitude: '')
    let latitude   = (body.latitude? body.latitude: '')

    return new Promise((resolve, reject) =>{
        sql.query("update places set place_name = ?, longitude = ?, latitude = ? where id = ? and user_id = ?", [ placeName, longitude, latitude, id, userId], async (err, res) => {
            if(err) {
                reject(err)
            }
            else{
                let record = await Place.getById(id)
                resolve(record[0])
            }
        });
    })
}

Place.getById = (id) => {
    return new Promise((resolve, reject) =>{
        sql.query("Select * from places where id = ?", id, (err, res) => {
            if(err) {
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    })
}

Place.deleteById = (userId, id) => {
    return new Promise((resolve, reject) =>{
        sql.query("delete from places where id = ? and user_id = ?", [ id, userId], async (err, res) => {
            if(err) {
                reject(err)
            }
            else{
                resolve(true)
            }
        });
    })
}
module.exports= Place;