import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";
import Main from "./components/main";
import Rank from "./components/rank";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

export default class Hello extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">App</Link>
            </li>
            <li>
              <Link to="/Main">Main</Link>
            </li>
            <li>
              <Link to="/Rank">Rank</Link>
            </li>
          </ul>
          <hr />
          <Route exact path="/" component={App} />
          <Route path="/Main" component={Main} />
          <Route path="/Rank" component={Rank} />
        </div>
      </Router>
    );
  }
}

//导入react-router
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
