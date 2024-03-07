import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './css/CreateExercise.component.css';


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
    axios.get('https://fit-track-epab.onrender.com/users')
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

    axios.post('https://fit-track-epab.onrender.com/exercises/add', exercise)
      .then(res => console.log(res.data));
    
    window.location = 'https://narainkarthikv-fit-track.netlify.app/';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='exercises-form-container'>
          <div className='exercises-form-group'>
            <label>Username:</label>
            <select
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
              className='exercises-form-control'
            >
              {this.state.users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className='exercises-form-group'>
            <label>Description:</label>
            <input
              type="text"
              required
              value={this.state.description}
              onChange={this.onChangeDescription}
              className='exercises-form-control'
            />
          </div>

          <div className='exercises-form-group'>
            <label>Duration:</label>
            <input
              type="text"
              required
              value={this.state.duration}
              onChange={this.onChangeDuration}
              className='exercises-form-control'
            />
          </div>

          <div className='exercises-form-group'>
            <label>Date:</label>
            <DatePicker
              required
              selected={this.state.date}
              onChange={this.onChangeDate}
              className='exercises-Dateform-control'
            />
          </div>
          <br/>
          <div>
            <button type="submit" className='exercises-submit-btn'>
              Create Exercise Log
            </button>
          </div>
        </form>
      </div>
    );
  }
}
