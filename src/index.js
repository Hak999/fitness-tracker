import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Login from "./components/auth/Login";
import Singup from "./components/auth/Signup";
import AddWorkout from "./components/excercise/AddWorkout";
import AddExcercise from "./components/excercise/AddExcercise";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
//Redux setup

const routing = (
  <Router>
    <Route exact path='/' component={App} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/Signup' component={Singup} />
    <Route exact path='/addworkout' component={AddWorkout} />
    <Route exact path='/addexcercise' component={AddExcercise} />
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
