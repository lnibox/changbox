import { Router, Switch, Route } from "react-router-dom";
import React from "react";
import {Provider} from "react-redux";
import store from "../store/config";
import {createBrowserHistory} from 'history';
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const history = createBrowserHistory();

export default function App() {
  return (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/signin">
                <SignIn />
                </Route>
                <Route path="/signup">
                <SignUp />
                </Route>
                <Route path="/">
                <Home />
                </Route>
            </Switch>
        </Router>
    </Provider>
  );
}
