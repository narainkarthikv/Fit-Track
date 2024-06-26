const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');

router.post('/add', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const year = new Date().getFullYear();
    const yearData = [];
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        yearData.push({ day, month, year, dayCheck: false });
      }
    }

    const newUser = new User({
      username,
      xp: 0,
      totalDays: 0,
      email,
      password,
      yearData
    });

    await newUser.save();

    const newExercise = new Exercise({
      userId: newUser._id,
      Exercises: []
    });

    await newExercise.save();

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '_id, email');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId });
    res.json({ username: user.username, xp: user.xp, totalDays: user.totalDays });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:userId/update-totalDays', async (req, res) => {
  try {
    const { userId } = req.params;
    const { updatedCheck } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalDays = updatedCheck.filter(day => day === true).length;
    user.totalDays = totalDays;

    await user.save();

    res.status(200).json({ message: 'Total workout days updated successfully', totalDays: user.totalDays });
  } catch (error) {
    console.error('Error updating total days:', error);
    res.status(500).json({ error: 'Internal server error' });
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

router.put('/:userId/update-day', async (req, res) => {
    const { userId } = req.params;
    const { day, month, year, dayCheck } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const dayIndex = user.yearData.findIndex(d => d.day === day && d.month === month && d.year === year);
        if (dayIndex === -1) {
            return res.status(400).json({ error: 'Invalid date' });
        }

        user.yearData[dayIndex].dayCheck = dayCheck;
        user.totalDays = user.yearData.filter(d => d.dayCheck).length;

        await user.save();

        res.status(200).json({ message: 'Day check status updated successfully', totalDays: user.totalDays });
    } catch (error) {
        console.error('Error updating day check status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
