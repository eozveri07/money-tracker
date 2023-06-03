const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/helper');

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    
    // password bilgisini kaldırıyoruz çünkü bu bilgiyi dönmek istemeyiz.
    savedUser.password = undefined;

    const token = generateToken(savedUser);

    res.json({
      user: savedUser,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User has not found' });
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // password bilgisini kaldırıyoruz çünkü bu bilgiyi dönmek istemeyiz.
    user.password = undefined;

    const token = generateToken(user);

    res.json({
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
