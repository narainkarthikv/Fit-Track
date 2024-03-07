import React, { Component } from 'react';
import axios from 'axios';
import './css/CreateUser.component.css';


export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount(){
  //   axios.get('https://fit-track-epab.onrender.com/users')
  //   .then(res => {
  //     if(res.data.length > 0){
  //       this.setState({
  //         users: res.data.map(user => user.username),
  //         username: res.data[0].username
  //      });
  //     } 
  //   });
  // }

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

    window.location = 'https://narainkarthikv-fit-track.netlify.app/users';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='users-form-container'>
          <div className='users-form-group'>
            <label>Username:</label>
            <input
              type="text"
              required
              className="users-form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <br/>
          <div>
            <button type="submit" className='users-submit-btn'>
              Create User
            </button>
          </div>
        </form>
      </div>
    );
  }
}
