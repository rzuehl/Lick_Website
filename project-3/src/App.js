import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css'
import CustomerView from './screens/CustomerView';
import MenuView from './screens/MenuView';
import LoginView from './screens/LoginView';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <CustomerView />
          </Route>
          <Route exact path="/menu">
            <MenuView />
          </Route>
          <Route exact path="/login">
            <LoginView />
          </Route>
        </Switch>
      </div>    
    </BrowserRouter>
  );
}

export default App;
