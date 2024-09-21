import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_API_URL;

const initialState = {
    monthData: [],
    status: 'idle',
    error: null,
};

const heatMapSlice = createSlice({
    name: 'heatmap',
    initialState,
    reducers: {
        fetchMonthDataSuccess: (state, action) => {
            state.monthData = action.payload;
            state.status = 'succeeded';
        },
        fetchMonthDataFailure: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },
        addExerciseSuccess: (state, action) => {
            state.monthData = action.payload;
            state.status = 'succeeded';
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

// Async thunk to fetch month data
export const fetchMonthData = (userID, selectedMonth) => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        const response = await axios.get(`${backendURL}/api/exercises/${userID}/data/${selectedMonth}`);
        dispatch(fetchMonthDataSuccess(response.data));
    } catch (error) {
        dispatch(fetchMonthDataFailure(error.toString()));
    }
};

// Async thunk to add exercise
export const addExercise = (userID, newExerciseData) => async (dispatch) => {
    try {
        await axios.post(`${backendURL}/api/exercises/${userID}/track-exercise`, newExerciseData);

        // Fetch updated month data after adding exercise
        const updatedMonthResponse = await axios.get(`${backendURL}/api/exercises/${userID}/data/${new Date(newExerciseData.date).toLocaleString('default', { month: 'long' })}`);
        
        // Dispatch success with updated month data
        dispatch(addExerciseSuccess(updatedMonthResponse.data));
    } catch (error) {
        console.error('Error adding exercise:', error);
    }
};

export const {
    fetchMonthDataSuccess,
    fetchMonthDataFailure,
    addExerciseSuccess,
    setStatus,
} = heatMapSlice.actions;

export default heatMapSlice.reducer;
