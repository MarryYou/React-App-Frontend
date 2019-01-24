import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "antd-mobile/dist/antd-mobile.css";
import "./index.css";
import Header from "../../components/header";
import TabBarBox from "../../components/tabbar";
import Main from "../home";
import Rank from "../rank";
import Search from "../search";
import User from "../user";
import Video from "../../components/videobox";

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main className="container">
            <Route exact path="/" component={Main} />
            <Route path="/rank" component={Rank} />
            <Route path="/search" component={Search} />
            <Route path="/video" component={Video} />
            <Route path="/user" component={User} />
          </main>
          <TabBarBox />
        </div>
      </Router>
    );
  }
}

export default App;
