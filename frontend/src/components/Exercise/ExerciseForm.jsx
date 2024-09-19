import React from 'react';

const ExerciseForm = ({ newExerciseData, handleChange, handleAdd, setFormVisible }) => (
    <tr>
        <td colSpan="4">
            <form onSubmit={handleAdd}>
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className="form-control input-lg m-1"
                            placeholder="Description"
                            value={newExerciseData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            className="form-control input-lg m-1"
                            placeholder="Duration (minutes)"
                            value={newExerciseData.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <div className="form-check mr-2">
                            <input
                                type="checkbox"
                                id="exerciseCheck"
                                name="exerciseCheck"
                                className="form-check-input"
                                checked={newExerciseData.exerciseCheck}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="exerciseCheck">Completed</label>
                        </div>
                    </div>
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-outline-secondary mr-2 mb-1"
                            onClick={() => setFormVisible(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-outline-primary">Add</button>
                    </div>
                </div>
            </form>
        </td>
    </tr>
);

export default ExerciseForm;
