import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css'
import CustomerView from './screens/CustomerView';
import MenuView from './screens/MenuView';
import LoginView from './screens/LoginView';
import CashierView from './screens/CashierView';
import ManagerView from './screens/ManagerView';

var stylename = "default";
export function toggleStyle() {
  console.log("changing style");
    if (stylename !== "default") stylename = "default";
    else stylename = "constrast";
    
    const style = document.documentElement.style;
    if (stylename === "default") {
      style.setProperty("--lick-pink", "#FFC7C8");
      style.setProperty("--lick-blue", "#7EEAFF");
      style.setProperty("--cream", "#FFFDD0");
      style.setProperty("--white", "#FFFFFF");
      style.setProperty("--black", "#000000");
      style.setProperty("--button-shadow", "#afafaffa");
      style.setProperty("--font-size", "1.3rem");
      style.setProperty("--inter", "inter");
      style.setProperty("--tile-color", "rgb(79, 75, 75)");

    } else {
      style.setProperty("--lick-pink", "#FF3333");
      style.setProperty("--lick-blue", "#3333FF");
      style.setProperty("--cream", "#FFFDE0");
      style.setProperty("--white", "#FFFFFF");
      style.setProperty("--black", "#000000");
      style.setProperty("--button-shadow", "#000000FF");
      style.setProperty("--font-size", "1.3rem");
      style.setProperty("--inter", "inter");
      style.setProperty("--tile-color", "rgb(79, 75, 75)");
    }
}

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
