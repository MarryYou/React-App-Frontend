import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "antd-mobile/dist/antd-mobile.css";
import "./index.css";
import Header from "../../components/header";
import TabBarBox from "../../components/tabbar";
import Main from "../home";
import Rank from "../rank";
import Search from "../search";
import Project from "../project";
import Video from "../../components/videobox";
const project = () => (
  <div>
    <p>project page</p>
  </div>
);

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
            <Route path="/project" component={Project} />
            <Route path="/video" component={Video} />
          </main>
          <TabBarBox />
        </div>
      </Router>
    );
  }
}

export default App;
