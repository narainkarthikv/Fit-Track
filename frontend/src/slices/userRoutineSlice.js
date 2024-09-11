import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dayCheck: new Array(7).fill(false),
  totalDays: 0,
  weeklyStreak: 0,
  status: 'idle',
  error: null,
};

const userRoutineSlice = createSlice({
  name: 'userRoutine',
  initialState,
  reducers: {
    setDayCheck: (state, action) => {
      state.dayCheck = action.payload;
    },
    setTotalDays: (state, action) => {
      state.totalDays = action.payload.totalDays;
      state.weeklyStreak = action.payload.weeklyStreak;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const fetchTotalDays = (userID) => async dispatch => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userID}`);
    const { totalDays, weeklyStreak } = response.data;
    dispatch(setTotalDays({ totalDays, weeklyStreak }));
  } catch (error) {
    dispatch(setError(error.toString()));
  }
};

export const updateTotalDays = (userID, updatedCheck) => async dispatch => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/user/${userID}/update-totalDays`, {
      updatedCheck: updatedCheck
    });
    dispatch(fetchTotalDays(userID)); // Refresh the total days and weekly streak after update
  } catch (error) {
    dispatch(setError(error.toString()));
  }
};

export const {
    setDayCheck,
    setTotalDays,
    setStatus,
    setError,
  } = userRoutineSlice.actions;
  
export default userRoutineSlice.reducer;