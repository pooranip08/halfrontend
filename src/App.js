// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import DoASurvey from "./components/DoASurvey";
import SurveysDone from "./components/SuverysDone";


function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <PrivateRoute path="/SurveyEx" component={DoASurvey} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/surveysdone" component={SurveysDone}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;