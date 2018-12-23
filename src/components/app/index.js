import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";
import Header from "../header";
import TabBarBox from "../tabbar";
import SwiperBox from "../swiper";
import NavBox from "../navbox";
import CardBox from "../card";
import RankBox from "../rankBox";
const index = () => (
  <div>
    <NavBox />
    <div className="card-container">
      <SwiperBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
    </div>
  </div>
);
const rank = () => (
  <div className="card-container">
    <RankBox />
  </div>
);
const search = () => <div />;
const project = () => (
  <div>
    <p>project page</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main className="container">
            <Route exact path="/" component={index} />
            <Route path="/rank" component={rank} />
            <Route path="/search" component={search} />
            <Route path="/project" component={project} />
          </main>
          <TabBarBox />
        </div>
      </Router>
    );
  }
}

export default App;
