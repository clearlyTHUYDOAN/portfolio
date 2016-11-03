import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Header from './Header';
import ToDoApp from './App';
import About from './About';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Header}>
      <IndexRoute component={ToDoApp} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
),
  document.getElementById('root')
);