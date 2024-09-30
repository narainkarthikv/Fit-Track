import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailsModal = ({ showModal, handleClose, selectedValue }) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedValue && (
                    <div className="text-center">
                        <p>Date: {selectedValue.date}</p>
                        <p>Exercises Count: {selectedValue.count}</p>
                        <p>Day Check: {selectedValue.dayCheck ? 'Completed' : 'Not Completed'}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailsModal;
