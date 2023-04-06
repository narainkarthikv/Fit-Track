import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('https://fit-track-ilkr.onrender.com/users')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
  
    console.log(exercise);
  
    axios.post('https://fit-track-ilkr.onrender.com/exercises/add', exercise)
      .then(res => {
        console.log(res.data);
        this.setState({
          username: '',
          description: '',
          duration: 0,
          date: new Date(),
        });
      })
      .catch(function(error){
        console.log(error);
      });
  
    axios.get('https://fit-track-ilkr.onrender.com/exercises/')
      .then(response => {
        this.setState({
          exercises: response.data,
        });
      });
  }
  
  
  

  render() {
    return (
      <div className="container-fluid">
        <h1>Create New Exercise Log</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes):</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Create Exercise Log
            </button>
          </div>
        </form>
      </div>
    );
  }
}
