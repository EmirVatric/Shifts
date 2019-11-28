import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/navbar/Navbar";
import Login from "../components/sessions/Login";
import Signup from "../components/sessions/Register";

export default (
  <Router>
    <Switch>
      <Route
        path="/login"
        exact
        render={() => (
          <Navbar title="Login">
            <Login />
          </Navbar>
        )}
      />
      <Route
        path="/signup"
        exact
        render={() => (
          <Navbar title="Signup">
            <Signup />
          </Navbar>
        )}
      />
      <Route
        path="/"
        render={() => (
          <Navbar title="Home Page">
            <Home />
          </Navbar>
        )}
      />
    </Switch>
  </Router>
);
