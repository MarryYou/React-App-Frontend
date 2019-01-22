import React, { Component } from "react";
import "./index.css";
import Player from "../player";
import axios from "axios";
import { domain } from "../../config";
import RankCard from "../rankcard";
import $ from "jquery";
import fetchJsonp from "fetch-jsonp";
import { Link, NavLink } from "react-router-dom";
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
  getanalysis_Video = () => {
    const avId = this.props.location.search.split("=")[1] || 0;
    axios.get(domain + "/analysis_video?avid=" + avId).then(res => {
      console.log(res);
    });
  };
  getVideoRecommand = () => {
    const avId = this.props.location.search.split("=")[1] || 0;
    axios.get(domain + "/videorecommand?avid=" + avId).then(res => {
      this.setState({ recommandInfo: res.data.recommandList.data });
    });
  };
  componentDidMount() {
    this.getanalysis_Video();
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
              let path = "/video?avId=" + item.aid;
              return (
                <RankCard
                  key={key}
                  path={path}
                  rankIndex={key}
                  rankImg={item.localaddress}
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
