import React, { Component } from "react";
import "./index.css";
class CardBox extends Component {
  sliceTitle = str => {
    return str.slice(0, 30);
  };
  render() {
    const { localaddress, title, path } = this.props;
    return (
      <div className="CardBox">
        <a href={path}>
          <div className="pic">
            <img src={localaddress} alt="" />
          </div>
          <div className="article_tit">
            <p>{this.sliceTitle(title)}</p>
          </div>
        </a>
      </div>
    );
  }
}

export default CardBox;
