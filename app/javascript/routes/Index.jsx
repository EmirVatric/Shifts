import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/navbar/Navbar";
import Login from "../components/sessions/Login";
import Signup from "../components/sessions/Register";
import CreateTask from "../components/tasks/create";
import Tasks from "../components/tasks/index";
import ShowTask from "../components/tasks/show";
import EditTask from "../components/tasks/edit";
import TimelineTasks from "../components/tasks/timeline";
import CreateTeam from "../components/teams/create";
import AllTeams from "../components/teams/index";
import UpdateTeam from "../components/teams/edit";
import ShowUser from "../components/user/show";

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
        path="/task/create"
        exact
        render={() => (
          <Navbar title="Create Task">
            <CreateTask />
          </Navbar>
        )}
      />
      <Route
        path="/teams/create"
        exact
        render={({ history }) => (
          <Navbar title="Create Team">
            <CreateTeam history={history} />
          </Navbar>
        )}
      />
      <Route
        path="/team/edit/:id"
        exact
        render={({ match, history, location }) => (
          <Navbar title="Update Team">
            <UpdateTeam match={match} history={history} location={location} />
          </Navbar>
        )}
      />
      <Route
        path="/task/edit/:id"
        exact
        render={({ match, history, location }) => (
          <Navbar title="Edit Task">
            <EditTask match={match} history={history} location={location} />
          </Navbar>
        )}
      />
      <Route
        path="/tasks"
        exact
        render={() => (
          <Navbar title="All Task">
            <Tasks />
          </Navbar>
        )}
      />
      <Route
        path="/teams"
        exact
        render={({ history }) => (
          <Navbar title="All Team">
            <AllTeams history={history} />
          </Navbar>
        )}
      />
      <Route
        path="/timeline"
        exact
        render={() => (
          <Navbar title="MyTasks">
            <TimelineTasks />
          </Navbar>
        )}
      />
      <Route
        path="/task/:id"
        exact
        render={({ match, history }) => (
          <Navbar title="Specific Task">
            <ShowTask match={match} history={history} />
          </Navbar>
        )}
      />
      <Route
        path="/user/:id"
        exact
        render={({ match, history }) => (
          <Navbar title="User Profile">
            <ShowUser match={match} history={history} />
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
