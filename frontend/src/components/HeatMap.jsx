import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const HeatMap = ({ backendURL }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [selectedValue, setSelectedValue] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [monthData, setMonthData] = useState([]);

    const months = Array.from({ length: 12 }, (_, index) => 
        new Date(0, index).toLocaleString('default', { month: 'long' })
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/exercises/data/${selectedMonth}`);
                const data = response.data;
                setMonthData(data);
            } catch (error) {
                console.error('Error fetching data', error);
                setMonthData([]);
            }
        };

        fetchData();
    }, [selectedMonth, backendURL]);

    const handleClick = (value) => {
        setSelectedValue(value);
        setShowModal(true);
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
                <div style={{ minHeight: "225px", maxHeight: "225px", overflowY: "auto" }}>
                    <div>
                        <CalendarHeatmap
                            startDate={new Date(`2024-${months.indexOf(selectedMonth) + 1}-01`)}
                            endDate={new Date(`2024-${months.indexOf(selectedMonth) + 1}-${new Date(2024, months.indexOf(selectedMonth) + 1, 0).getDate()}`)}
                            values={monthData}
                            classForValue={(value) => {
                                if (!value || value.count === 0) {
                                    return 'color-empty';
                                }
                                if (value.count < 4) {
                                    return 'color-scale-blue';
                                } else if (value.count < 8) {
                                    return 'color-scale-yellow';
                                } else {
                                    return 'color-scale-green';
                                }
                            }}
                            onClick={handleClick}
                            horizontal={false}
                            gutterSize={5}
                        />
                    </div>
                </div>
            </div>

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
        </div>
    );
};

export default HeatMap;
