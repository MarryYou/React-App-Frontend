import React, { Component } from "react";
import "./index.css";
import Player from "../player";
import axios from "axios";
import { domain } from "../../config";
import RankCard from "../rankcard";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = { videoInfo: {}, recommandInfo: {}, danmuInfo: [] };
  }
  getVideo = () => {
    axios.get(domain + "/video").then(res => {
      this.setState({ videoInfo: res.data.info, danmuInfo: res.data.comment });
    });
  };
  getVideoRecommand = () => {
    axios.get(domain + "/videorecommand").then(res => {
      this.setState({ recommandInfo: res.data.recommandList.data });
    });
  };

  componentDidMount() {
    this.getVideoRecommand();
  }
  render() {
    const avId = this.props.location.search.split("=")[1] || 0;
    return (
      <div className="VideoBox">
        <Player avId={avId} />
        {this.state.recommandInfo.length > 0 &&
          this.state.recommandInfo.map((item, key) => {
            if (key < 15) {
              return (
                <RankCard
                  key={key}
                  rankIndex={key}
                  rankImg={"http:" + item.pic}
                  rankTitle={item.title}
                  rannSort={false}
                  upName={item.owner.name}
                  videoNumber={item.stat.view}
                  danmuNumber={item.stat.danmaku}
                />
              );
            }
          })}
      </div>
    );
  }
}
export default Video;
