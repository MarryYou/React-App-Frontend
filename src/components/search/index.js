import React, { Component } from "react";
import { SearchBar } from "react-weui";
import "weui";
import "react-weui/build/packages/react-weui.css";
import "./index.css";

class Search extends Component {
  render() {
    return (
      <div className="Search">
        <SearchBar placeholder={"搜索视频、番剧、UP主或AV号"} />
      </div>
    );
  }
}

export default Search;
