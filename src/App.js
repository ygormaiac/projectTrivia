import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Play from './pages/Play';

import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/play" component={ Play } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
