const db = require('./../DB.js');

var User = function(user) {
    this.id     = user.id;
    this.username     = user.username;
    this.password     = user.password;
    this.first_name     = user.first_name;
    this.last_name     = user.last_name;
};

User.create = function (user, result) {
    db.query('INSERT INTO tbl_user set ?', user, (err, rows) => {
        if (!err) {
            result(null, rows.insertId);
        } else {
            result(null, err);
        }
    });
};

User.update = function (id, user, result) {
    db.query('UPDATE tbl_user set username=?,first_name=?,last_name=? WHERE id=?', [user.username, user.first_name, user.last_name, id], (err, rows) => {
        if (!err) {
            result(null, rows);
        } else {
            result(null, err);
        }
    });
};

User.delete = function (id, result) {
    db.query('DELETE FROM tbl_user WHERE id=?', [id], (err, rows) => {
        if (!err) {
            result(null, rows);
        } else {
            result(null, err);
        }
    });
};

User.findAll = function (result) {
    db.query('SELECT * FROM tbl_user', (err, rows) => {
        if (!err) {
            result(null, rows);
        } else {
            result(null, err);
        }
    });
};

User.findById = function (id, result) {
    db.query('SELECT * FROM tbl_user WHERE id = ?', id, (err, rows) => {
        if (!err) {
            result(null, rows);
        } else {
            result(null, err);
        }
    });
};

User.auth = function (username, password, result) {
    db.query('SELECT * FROM tbl_user WHERE username = ? AND password = ?', [username, password], (err, rows, fields) => {
        if (!err) {
            result(null, rows);
        } else {
            result(null, err);
        }
    });
};

module.exports = User;