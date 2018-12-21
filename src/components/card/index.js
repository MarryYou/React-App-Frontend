import React, { Component } from "react";
import "./index.css";
class CardBox extends Component {
  render() {
    return (
      <div className="CardBox">
        <div className="pic">
          <img
            src="//i0.hdslb.com/bfs/archive/b2b0d8bdd4199ceb452146dfb145b8f512e35271.jpg@320w_200h.webp"
            alt=""
          />
        </div>
        <div className="article_tit">
          <p>
            游戏史上最震撼的BOSS战 1万公里巨型生物！游戏史上最震撼的BOSS战
            1万公里巨型生物
          </p>
        </div>
      </div>
    );
  }
}

export default CardBox;
