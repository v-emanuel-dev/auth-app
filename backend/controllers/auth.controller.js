const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Registrar um novo usuário
exports.register = (req, res) => {
  const { email, password } = req.body;

  // Verifica se o usuário já existe
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Cria um novo usuário
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating user', error: err });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  });
};

// Login do usuário
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // Verifica a senha
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ accessToken: null, message: 'Invalid password' });
    }

    // Gera um token JWT
    const jwt = require('jsonwebtoken');

    // After the user is authenticated and you want to sign a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).json({ accessToken: token });
  });
};
