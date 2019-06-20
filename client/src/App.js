import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";

import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// Redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // only run once
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Alerts />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
