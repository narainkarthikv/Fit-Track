import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the backend URL from environment variable
const backendURL = process.env.REACT_APP_API_URL;

const initialState = {
  exercises: [],
  status: 'idle',
  error: null,
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    fetchExercisesSuccess: (state, action) => {
      state.exercises = action.payload;
      state.status = 'succeeded';
    },
    fetchExercisesFailure: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    addExerciseSuccess: (state, action) => {
      state.exercises = action.payload;
      state.status = 'succeeded';
    },
    deleteExerciseSuccess: (state, action) => {
      state.exercises = state.exercises.filter(exercise => exercise._id !== action.payload);
      state.status = 'succeeded';
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const fetchExercises = (userID) => async dispatch => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get(`${backendURL}/api/exercises/${userID}/exercises_list`);
    dispatch(fetchExercisesSuccess(response.data.Exercises));
  } catch (error) {
    dispatch(fetchExercisesFailure(error.toString()));
  }
};

export const addExercise = (userID, newExerciseData) => async dispatch => {
  try {
    const response = await axios.post(`${backendURL}/api/exercises/${userID}/add`, newExerciseData);
    dispatch(addExerciseSuccess(response.data.Exercises));
  } catch (error) {
    console.error('Error adding exercise:', error);
  }
};

export const deleteExercise = (userID, exerciseId) => async dispatch => {
  try {
    await axios.delete(`${backendURL}/api/exercises/${userID}/exercises_list/${exerciseId}`);
    dispatch(deleteExerciseSuccess(exerciseId));
  } catch (error) {
    console.error('Error deleting exercise:', error);
  }
};

export const {
  fetchExercisesSuccess,
  fetchExercisesFailure,
  addExerciseSuccess,
  deleteExerciseSuccess,
  setStatus,
} = exercisesSlice.actions;

export default exercisesSlice.reducer;