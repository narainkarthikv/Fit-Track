import React, { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Modal, Button } from 'react-bootstrap';

const HeatMap = () => {
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedValue, setSelectedValue] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        'January': [
            { date: '2024-01-01', count: 5, dayCheck: true },
            { date: '2024-01-02', count: 3, dayCheck: false },
            { date: '2024-01-03', count: 10, dayCheck: true },
            // ... add more data for each day of January
        ],
        'February': [
            { date: '2024-02-01', count: 2, dayCheck: true },
            { date: '2024-02-02', count: 4, dayCheck: false },
            // ... add more data for each day of February
        ],
        // ... add data for other months
    };

    const getMonthData = (month) => {
        const monthIndex = months.indexOf(month) + 1;
        const year = '2024';
        const daysInMonth = new Date(year, monthIndex, 0).getDate();

        const defaultEntry = { count: 0, dayCheck: false }; 

        const monthData = Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const date = `${year}-${String(monthIndex).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const entry = data[month]?.find(d => d.date === date) || defaultEntry;
            return { date, ...entry };
        });

        return monthData;
    };

    const handleClick = (value) => {
        setSelectedValue(value);
        setShowModal(true);
    };

    const monthData = getMonthData(selectedMonth);

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
                            startDate={new Date(`${selectedMonth} 01 2024`)}
                            endDate={new Date(`${selectedMonth} ${new Date(2024, months.indexOf(selectedMonth) + 1, 0).getDate()} 2024`)}
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
