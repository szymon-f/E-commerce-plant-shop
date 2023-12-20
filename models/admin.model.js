const db = require('./db');

const Admin = function(username, passwordHash){
    this.username = username;
    this.passwordHash = passwordHash;
};

//TODO: format this file using prettier; add missing methods

Admin.create = (newAdmin, result) => {
    const query = "INSERT INTO admins VALUES (?,?);";
    const params = [newAdmin.username, newAdmin.passwordHash];
    db.run(query, params, function (err, data){
        if (err){
            console.error("Error while inserting new admin into the database: ", err.message);
            result(err, null);
            return;
        }
        console.log("Added new admin to the database: ", {id: this.lastID, ...newAdmin});
        result(null, {id: this.lastID, ...newAdmin});
    })
};