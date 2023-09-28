import React, { Component } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';


export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    axios.get('https://fit-track-epab.onrender.com/users/')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUser(id) {
    axios.delete('https://fit-track-epab.onrender.com/users/'+id)
      .then(response => { console.log(response.data)});
    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  render() {
    return (
      <div>
        <h3 style={{color:"white"}}>Users List</h3>
        <Table striped bordered hover responsive>
          <thead className="thead-light">
            <tr style={{color:"white",backgroundColor:"black"}}>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody tbody style={{backgroundColor:"white"}}> 
            { this.state.users.map(user => {
              return (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>
                    <button className= "btn btn-danger" onClick={() => { this.deleteUser(user._id) }}> <FaTrash/> </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          </Table>
      </div>
    )
  }
}
