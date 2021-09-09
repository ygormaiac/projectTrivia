import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Play, Settings, Feedback } from './pages';

import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/play" component={ Play } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
