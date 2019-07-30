var sql = require('./db');

var Contact = function(contact){
    // this.userId = user.id;
    // this.status = task.status;
    // this.created_at = new Date();
};

Contact.findAll = (userId) => {
    return new Promise((resolve, reject) =>{
        sql.query("Select * from contacts where user_id = ?", userId, (err, res) => {
            if(err) {
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    })
}

Contact.createOne = (userId, body) => {

    let firstName       = (body.firstName? body.firstName: '')
    let lastName        = (body.lastName? body.lastName: '')
    let contactNumber   = (body.contactNumber? body.contactNumber: '')

    return new Promise((resolve, reject) =>{
        sql.query("Insert into contacts (user_id, first_name, last_name, contact_number) values (?,?,?,?)", [userId, firstName, lastName, contactNumber], async (err, res) => {
            if(err) {
                reject(err)
            }
            else{
                let record = await Contact.getById(res.insertId)
                resolve(record[0])
            }
        });
    })
}

Contact.updateOne = (userId, id, body) => {

    let firstName       = (body.firstName? body.firstName: '')
    let lastName        = (body.lastName? body.lastName: '')
    let contactNumber   = (body.contactNumber? body.contactNumber: '')

    return new Promise((resolve, reject) =>{
        sql.query("update contacts set first_name = ?, last_name = ?, contact_number = ? where id = ? and user_id = ?", [ firstName, lastName, contactNumber, id, userId], async (err, res) => {
            if(err) {
                reject(err)
            }
            else{
                let record = await Contact.getById(id)
                resolve(record[0])
            }
        });
    })
}

Contact.getById = (id) => {
    return new Promise((resolve, reject) =>{
        sql.query("Select * from contacts where id = ?", id, (err, res) => {
            if(err) {
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    })
}

Contact.deleteById = (userId, id) => {
    return new Promise((resolve, reject) =>{
        sql.query("delete from contacts where id = ? and user_id = ?", [ id, userId], async (err, res) => {
            if(err) {
                reject(err)
            }
            else{
                resolve(true)
            }
        });
    })
}
module.exports= Contact;