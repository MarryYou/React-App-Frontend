import React, { Component } from "react";
import "./index.css";
import { domain } from "../../config";
import { withRouter } from "react-router-dom";
class RankCard extends Component {
  constructor(props) {
    super(props);
  }
  sliceTitle = str => {
    return str.slice(0, 26);
  };
  playVideo = path => {
    if (path.length > 0) this.props.history.push(path);
  };
  componentDidMount() {
    this.setState({ path: this.props.path });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ path: nextProps.path });
  }
  render() {
    const {
      rankIndex,
      rankImg,
      rankTitle,
      upName,
      videoNumber,
      danmuNumber,
      path
    } = this.props;
    let { rankSort } = this.props || true;
    return (
      <div className="rankCard">
        <a href={path}>
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
                  <img
                    src={domain + "/static/image/icon/ico_play.png"}
                    alt=""
                  />
                </div>
                <div className="video-number">
                  <span>{videoNumber}</span>
                </div>
                <div className="danmu-icon">
                  <img
                    src={domain + "/static/image/icon/ico_danmu.png"}
                    alt=""
                  />
                </div>
                <div className="danmu-number">
                  <span>{danmuNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default withRouter(RankCard);
