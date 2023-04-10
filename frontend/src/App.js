import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component';
import ExercisesList from './components/exercises-list.component';
// import EditExercise from './components/edit-exercise.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';
import UsersList from './components/edit-user.component';


function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
          <Route exact path='/' component={ExercisesList} />
          {/* <Route path='/edit/:id' component={EditExercise} /> */}
          <Route path='/create' component={CreateExercise} />
          <Route path='/user' component={CreateUser} />
          <Route path='/user:id' component={UsersList} />
      </div>
    </Router>
  );
}

export default App;