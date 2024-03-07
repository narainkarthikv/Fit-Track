import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/navbar.component';
import ExercisesList from './components/ExercisesList.component';
// import CreateExercise from './components/create-exercise.component';
// import CreateUser from './components/CreateUser.component';
import UsersList from './components/UsersList.component';
// import HomePage from './components/HomePage.component.jsx';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
          {/* <Route exact path='/' component={HomePage}/> */}
          <Route exact path='/' component={ExercisesList} />
          <Route path='/users' component={UsersList} />
      </div>
    </Router>
  );
}

export default App;