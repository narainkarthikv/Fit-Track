import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '../slices/exercisesSlice'; 
import userRoutineReducer from '../slices/userRoutineSlice';

const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    userRoutine: userRoutineReducer,
  },
});

export default store;
