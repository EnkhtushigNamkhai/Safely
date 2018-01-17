import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));