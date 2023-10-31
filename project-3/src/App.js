import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css'
import CustomerView from './screens/CustomerView';
import MenuView from './screens/MenuView';
import LoginView from './screens/LoginView';
import CashierView from './screens/CashierView';
import ManagerView from './screens/ManagerView';

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
          <Route exact path ="/cashier">
            <CashierView />
          </Route>
          <Route exact path ="/manager">
            <ManagerView />
          </Route>
        </Switch>
      </div>    
    </BrowserRouter>
  );
}

export default App;
