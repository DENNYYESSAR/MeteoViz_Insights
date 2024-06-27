const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.signup = (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send(err);

        const query = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
        db.query(query, [firstName, lastName, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).send(err);

            const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({ token });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).json({ message: 'Auth failed' });

        bcrypt.compare(password, results[0].password, (err, result) => {
            if (err) return res.status(500).send(err);
            if (!result) return res.status(401).json({ message: 'Auth failed' });

            const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        });
    });
};
