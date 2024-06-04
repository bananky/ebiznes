const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = {
  user1: 'password1',
  user2: 'password2',
};

const SECRET_KEY = 'your_secret_key';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
