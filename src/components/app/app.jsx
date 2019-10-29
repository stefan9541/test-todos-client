import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "../header";
import LoginPageContainer from "../../containers/loginPageContainer";
import HomePage from "../homePage"

import 'antd/dist/antd.css';

function App() {
  return (
    <Router>

      <Header />

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPageContainer} />
      </Switch>
    </Router>
  );
}

export default App;
