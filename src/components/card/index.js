import React, { Component } from "react";
import "./index.css";
class CardBox extends Component {
  sliceTitle = str => {
    return str.slice(0, 30);
  };
  render() {
    const { localaddress, title } = this.props;
    return (
      <div className="CardBox">
        <div className="pic">
          <img src={localaddress} alt="" />
        </div>
        <div className="article_tit">
          <p>{this.sliceTitle(title)}</p>
        </div>
      </div>
    );
  }
}

export default CardBox;
