import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "weui";
import "react-weui/build/packages/react-weui.css";
import "./index.css";
import logo from "./logo.svg";
class Header extends Component {
  render() {
    return (
      <header className="nav">
        <Link to="/" className="website-img">
          <img src={logo} alt="logo" />
        </Link>
        <h5 className="title"> react-bilibili</h5>
        <a
          href="https://github.com/MarryYou/React-App-Frontend"
          target="_blank"
          className="github-link"
        >
          <img
            className="github-iocn"
            src="https://avatars1.githubusercontent.com/u/17715691?s=460&v=4"
          />
        </a>
      </header>
    );
  }
}
export default Header;
