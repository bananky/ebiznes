const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const router = express.Router();


router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ msg: 'Użytkownik już istnieje' });
    }

    const user = new User({ username, password });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Błąd serwera' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Niepoprawne dane logowania' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Niepoprawne dane logowania' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Błąd serwera' });
  }
});

module.exports = router;
