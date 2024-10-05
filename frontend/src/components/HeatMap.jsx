import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthData, addExercise } from '../slices/heatMapSlice';

import HeatmapControls from './Heatmap/HeatmapControls';
import ExerciseModal from './Heatmap/ExerciseModal';
import DetailsModal from './Heatmap/DetailsModal';

const HeatMap = ({ userID }) => {
    const dispatch = useDispatch();
    const monthData = useSelector((state) => state.heatMap.monthData);
    const status = useSelector((state) => state.heatMap.status);

    const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [selectedValue, setSelectedValue] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newExerciseCount, setNewExerciseCount] = useState(0);
    const [exerciseDate, setExerciseDate] = useState(new Date().toISOString().split('T')[0]);

    const months = Array.from({ length: 12 }, (_, index) => new Date(0, index).toLocaleString('default', { month: 'long' }));

    useEffect(() => {
        if (userID) {
            dispatch(fetchMonthData(userID, selectedMonth));
        }
    }, [dispatch, userID, selectedMonth]);

    const handleClick = (value) => {
        setSelectedValue(value);
        setShowModal(true);
    };

    const handleAddExercise = () => {
        setExerciseDate(new Date().toISOString().split('T')[0]);
        setNewExerciseCount(0);
        setShowAddModal(true);
    };

    const handleSubmitExercise = () => {
        if (exerciseDate && newExerciseCount > 0) {
            const newExerciseData = { 
                date: new Date(exerciseDate).toISOString(), 
                count: Number(newExerciseCount),
            };

            dispatch(addExercise(userID, newExerciseData)).then(() => {
                resetAddExerciseForm();
            });
        }
    };

    const resetAddExerciseForm = () => {
        setShowAddModal(false);
        setExerciseDate(new Date().toISOString().split('T')[0]);
        setNewExerciseCount(0);
    };

    const renderCalendarHeatmap = () => {
        const year = new Date().getFullYear(); // Get the current year
        const monthIndex = months.indexOf(selectedMonth);
        const startDate = new Date(year, monthIndex, 0); // Set to the first day of the month
        const endDate = new Date(year, monthIndex + 1, 0); // Set to the last day of the month
    
        return (
            status === 'loading' ? (
                <p>Loading...</p>
            ) : (
                <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={Array.isArray(monthData) ? monthData : []}
                    classForValue={(value) => {
                        if (!value || value.count === 0) return 'color-empty';
                        if (value.count < 4) return 'bg-danger';
                        if (value.count < 8) return 'bg-warning';
                        return 'bg-success';
                    }}
                    onClick={handleClick}
                    horizontal={false}
                    gutterSize={5}
                />
            )
        );
    };
    

    return (
        <div className="p-1 d-flex font-weight-bold flex-column justify-content-center">
            <HeatmapControls
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                handleAddExercise={handleAddExercise}
                months={months}
            />

            <div className="w-50">
                {renderCalendarHeatmap()}
            </div>

            <DetailsModal
                showModal={showModal}
                handleClose={() => setShowModal(false)}
                selectedValue={selectedValue}
            />

            <ExerciseModal
                showAddModal={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleSubmitExercise={handleSubmitExercise}
                exerciseDate={exerciseDate}
                setExerciseDate={setExerciseDate}
                newExerciseCount={newExerciseCount}
                setNewExerciseCount={setNewExerciseCount}
            />
        </div>
    );
};

export default HeatMap;
