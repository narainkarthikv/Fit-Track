import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    };

    console.log(user);

    axios.post('https://fit-track-epab.onrender.com/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    });
  }

  render() {
    return (
      <div>
        {/* <h3 className="my-3">Create New User</h3> */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </div>
        </form>
      </div>
    );
  }
}
