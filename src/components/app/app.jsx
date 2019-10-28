import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "../header";
import LoginPageContainer from "../../containers/loginPageContainer";
import TodoList from '../todoList';
import HeaderPanel from "../headerPanel"

import 'antd/dist/antd.css';

function App() {
  return (
    <Router>

      <Header />
      <HeaderPanel />

      <Switch>
        <Route path="/" exact component={TodoList} />
        <Route path="/login" exact component={LoginPageContainer} />
      </Switch>
    </Router>
  );
}

export default App;
