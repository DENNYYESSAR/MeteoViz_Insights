const db = require('./db');

const createUser = (user, callback) => {
    const query = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    db.execute(query, [user.firstName, user.lastName, user.email, user.password], callback);
};

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [email], callback);
};

module.exports = { createUser, findUserByEmail };
