const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');

router.get('/', async (req, res) => {
  try {
    const ExerciseData = await Exercise.find({});
    if (!ExerciseData) {
      return res.status(404).json({ error: 'Exercise data not found for this ID.' });
    }
    return res.json(ExerciseData);
  } 
  catch (error) {
    console.error('Error fetching exercise data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:userId/exercises_list', async (req, res) => {
  const { userId } = req.params;
  try {
    const exerciseData = await Exercise.findOne({ userId: userId });
    if (!exerciseData) {
      return res.status(404).json({ error: 'Exercise data not found for this userId.' });
    }
    return res.json(exerciseData);
  } catch (error) {
    console.error('Error fetching exercise data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:userId/add', async (req, res) => {
  const { userId } = req.params;
  const { description, duration, exerciseCheck } = req.body; 

  try {
    const exercisesData = await Exercise.findOne({ userId: userId });
    if (!exercisesData) {
      return res.status(404).json({ message: 'Exercise data not found for this userId.' });
    }
    exercisesData.Exercises.push({ description, duration, exerciseCheck }); 
    await exercisesData.save();
    res.status(201).json(exercisesData);
  } catch (error) {
    console.error('Error adding exercise:', error);
    res.status(500).json({ message: 'Error adding exercise to the database.' });
  }
});

router.delete('/:userId/exercises_list/:exerciseId', async (req, res) => {
  const { userId, exerciseId } = req.params;
  try {
    const exerciseData = await Exercise.findOne({ userId: userId });
    if (!exerciseData) {
      return res.status(404).json({ message: 'Exercise data not found for this userId.' });
    }
    const exerciseToRemove = exerciseData.Exercises.find(exercise => exercise._id == exerciseId); 
    if (!exerciseToRemove) {
      return res.status(404).json({ message: 'Exercise not found in exercise data.' });
    }
    exerciseData.Exercises.pull({ _id: exerciseId });
    await exerciseData.save();
    res.json({ message: `${exerciseId} Exercise deleted successfully.` });
  } catch (error) {
    console.error('Error deleting Exercise:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
