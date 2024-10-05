import React from 'react';

const ExerciseForm = ({ newExerciseData, handleChange, handleAdd, setFormVisible }) => (
  <tr>
    <td colSpan="4">
      <form onSubmit={handleAdd} className="d-flex justify-content-between align-items-center">
        <div className="col-3">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description"
            value={newExerciseData.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-3">
          <input
            type="number"
            name="duration"
            className="form-control"
            placeholder="Duration (minutes)"
            value={newExerciseData.duration}
            onChange={handleChange}
          />
        </div>
        <div className="col-3 form-check">
          <input
            type="checkbox"
            name="exerciseCheck"
            className="form-check-input"
            checked={newExerciseData.exerciseCheck}
            onChange={handleChange}
          />
          <label className="form-check-label">Completed</label>
        </div>
        <div className="col-3">
          <button
            type="button"
            className="btn btn-outline-secondary me-1"
            onClick={() => setFormVisible(false)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-outline-primary">Add</button>
        </div>
      </form>
    </td>
  </tr>
);

export default ExerciseForm;