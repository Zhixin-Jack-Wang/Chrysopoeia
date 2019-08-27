import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Welcome from "./pages/Welcome/Welcome";
import MyStuff from "./pages/MyStuff/MyStuff";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import MyItemDetails from "./pages/MyItemDetails/MyItemDetails";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/users/register" component={Register} />
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/users/dashboard" component={Dashboard} />
          <Route exact path="/users/mystuff" component={MyStuff} />
          <Route
            exact
            path="/users/mystuff/details"
            component={MyItemDetails}
          />
          <Route path="/details" component={ItemDetails} />
        </Switch>
      </Router>
    );
  }
}
export default App;
