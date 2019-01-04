import React, { Component } from "react";
import "./index.css";
import { domain } from "../../config";
class RankCard extends Component {
  sliceTitle = str => {
    return str.slice(0, 26);
  };
  render() {
    const {
      rankIndex,
      rankImg,
      rankTitle,
      upName,
      videoNumber,
      danmuNumber
    } = this.props;
    let { rankSort } = this.props || true;
    return (
      <div className="rankCard">
        {rankSort && (
          <div className="left">
            {rankIndex == 0 && (
              <img src={domain + "/static/image/icon/rank1.png"} alt="" />
            )}
            {rankIndex == 1 && (
              <img src={domain + "/static/image/icon/rank2.png"} alt="" />
            )}
            {rankIndex == 2 && (
              <img src={domain + "/static/image/icon/rank3.png"} alt="" />
            )}
            {rankIndex > 2 && <p className="rankIndex">{rankIndex + 1}</p>}
          </div>
        )}
        <div className="right">
          <div className="pic">
            <img src={rankImg} alt="" />
          </div>
          <div className="art-box">
            <p className="art-title">{this.sliceTitle(rankTitle)}</p>
            <div className="art-up">
              <div className="up-icon">
                <img src={domain + "/static/image/icon/ico_up.png"} alt="" />
              </div>
              <div className="up-name">
                <span>{upName}</span>
              </div>
            </div>
            <div className="art-video">
              <div className="video-icon">
                <img src={domain + "/static/image/icon/ico_play.png"} alt="" />
              </div>
              <div className="video-number">
                <span>{videoNumber}</span>
              </div>
              <div className="danmu-icon">
                <img src={domain + "/static/image/icon/ico_danmu.png"} alt="" />
              </div>
              <div className="danmu-number">
                <span>{danmuNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RankCard;
