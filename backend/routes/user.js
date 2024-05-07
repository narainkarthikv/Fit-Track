const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model'); 

router.post('/add', async (req, res) => {
  try {
    const { username,xp, email, password } = req.body;

    const newUser = new User({
      username,
      xp,
      email,
      password, 
    });

    await newUser.save(); 

    const newExercise = new Exercise({
      userId: newUser._id,
      Exercises: []
    });

    await newExercise.save();

    const response = {
      message: 'User created successfully'
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await User.findOne({ _id: userId});
    res.json({username: user.username, xp: user.xp});
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
