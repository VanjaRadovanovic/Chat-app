import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Form from './components/Form';
import Room from './components/Room'

function App() {
  return (
    <Router >
      <div className="App">
        <Switch>
          <Route exact path='/' component={Form}/>
          <Route path='/room' component={Room}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
