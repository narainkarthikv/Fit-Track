import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthData, addExercise } from '../slices/heatMapSlice';

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

    const months = Array.from({ length: 12 }, (_, index) =>
        new Date(0, index).toLocaleString('default', { month: 'long' })
    );

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
        const today = new Date().toISOString().split('T')[0];
        setExerciseDate(today);
        setNewExerciseCount(0);
        setShowAddModal(true);
    };

    const handleSubmitExercise = () => {
        if (exerciseDate && newExerciseCount > 0) {
            const newExerciseData = { 
                date: new Date(exerciseDate).toISOString(), 
                count: Number(newExerciseCount) 
            };
            
            dispatch(addExercise(userID, newExerciseData)).then(() => {
                setShowAddModal(false);
                setExerciseDate(new Date().toISOString().split('T')[0]);
                setNewExerciseCount(0);
            });
        }
    };

    return (
        <div className="p-1 d-flex font-weight-bold">
            <div className="d-flex mb-3">
                <label className="mr-2 mt-2" htmlFor="selectMonth">Select Month:</label>
                <select
                    id="selectMonth"
                    className="form-control w-auto form-select rounded-5"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            <div className="container-fluid w-50">
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ minHeight: "225px", maxHeight: "225px", overflowY: "auto" }}>
                        <CalendarHeatmap
                            startDate={new Date(`2024-${months.indexOf(selectedMonth) + 1}-01`)}
                            endDate={new Date(`2024-${months.indexOf(selectedMonth) + 1}-${new Date(2024, months.indexOf(selectedMonth) + 1, 0).getDate()}`)}
                            values={Array.isArray(monthData) ? monthData : []}
                            classForValue={(value) => {
                                if (!value || value.count === 0) {
                                    return 'color-empty';
                                }
                                if (value.count < 4) {
                                    return 'bg-danger';
                                } else if (value.count < 8) {
                                    return 'bg-warning';
                                } else {
                                    return 'bg-success';
                                }
                            }}
                            onClick={handleClick}
                            horizontal={false}
                            gutterSize={5}
                        />
                    </div>
                )}
            </div>

            <Button variant="primary" onClick={handleAddExercise}>
                Add Exercise
            </Button>

            {/* View Exercise Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedValue && (
                        <div className='text-center'>
                            <p>Date: {selectedValue.date}</p>
                            <p>Exercises Count: {selectedValue.count}</p>
                            <p>Day Check: {selectedValue.dayCheck ? 'Completed' : 'Not Completed'}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Exercise Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Exercise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exerciseDate">
                            <Form.Label>Select Date:</Form.Label>
                            <Form.Control
                                type="date"
                                value={exerciseDate}
                                onChange={(e) => setExerciseDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="exerciseCount">
                            <Form.Label>Exercise Count:</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                value={newExerciseCount}
                                onChange={(e) => setNewExerciseCount(Number(e.target.value) || 0)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitExercise}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HeatMap;
