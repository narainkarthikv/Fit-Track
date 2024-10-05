import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = import.meta.env.VITE_API_URL;

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
        addExerciseFailure: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
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
        dispatch(setStatus('failed'));
    }
};

// Async thunk to add exercise
export const addExercise = (userID, newExerciseData) => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        await axios.post(`${backendURL}/api/exercises/${userID}/track-exercise`, newExerciseData);

        // Fetch updated month data after adding exercise
        const updatedMonthResponse = await axios.get(`${backendURL}/api/exercises/${userID}/data/${new Date(newExerciseData.date).toLocaleString('default', { month: 'long' })}`);
        
        // Dispatch success with updated month data
        dispatch(addExerciseSuccess(updatedMonthResponse.data));
        dispatch(setStatus('succeeded'));
    } catch (error) {
        console.error('Error adding exercise:', error);
        dispatch(addExerciseFailure(error.toString()));
        dispatch(setStatus('failed'));
    }
};

export const {
    fetchMonthDataSuccess,
    fetchMonthDataFailure,
    addExerciseSuccess,
    addExerciseFailure,
    setStatus,
} = heatMapSlice.actions;

export default heatMapSlice.reducer;
