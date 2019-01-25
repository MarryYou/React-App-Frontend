import React, { Component } from "react";
import { CanvasBarrage } from "./canvasBarrage";
import axios from "axios";
import { domain, formatNumber } from "../../config";
import { Toast, ActivityIndicator } from "antd-mobile";
import "./index.css";
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { videoInfo: {}, video_info: {} };
  }
  getVideo = () => {
    axios.get(domain + "/video?avid=" + this.props.avId).then(res => {
      this.setState({ videoInfo: res.data.info });
      let eleCanvas = document.getElementById("canvasBarrage");
      let eleVideo = document.getElementById("videoBarrage");
      let demoBarrage = new CanvasBarrage(eleCanvas, eleVideo, {
        data: res.data.comment,
        opacity: 100,
        speed: 3.5,
        fontSize: parseInt(document.all[0].style.fontSize) / 1.5
      });
    });
  };
  getanalysis_Video = () => {
    axios.get(domain + "/analysis_video?avid=" + this.props.avId).then(res => {
      this.setState({ video_info: res.data });
    });
  };
  timeTodate(time) {
    let date = new Date(parseInt(time) * 1000);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  }
  toastVideo() {
    Toast.loading("正在加载中...", 0, () => {}, true);
  }
  componentDidMount() {
    this.getVideo();
    this.getanalysis_Video();
  }
  resetVideourl(url) {
    url = url.split("/");
    let new_url =
      "http://upos-hz-mirrorks3u.acgvideo.com/" + url.splice(3).join("/");
    return new_url;
  }
  render() {
    const videoInfo = this.state.videoInfo;
    const video = this.state.video_info;

    if (videoInfo.reduxAsyncConnect && video.durl) {
      return (
        <div className="Player">
          <canvas id="canvasBarrage" className="canvas-barrage" />
          <video
            id="videoBarrage"
            preload="auto"
            controls="controls"
            x5-playsinline=""
            playsInline={true}
            webkit-playsinline="true"
          >
            <source
              src={this.resetVideourl(video.durl[0].url)}
              type="video/mp4"
            />
          </video>
          <div>
            <p className="video-title">
              {videoInfo.reduxAsyncConnect.videoInfo.title}
            </p>
            <div className="video-info">
              <div className="anthor-info">
                <span className="anthor-name">
                  <a
                    className="up-link"
                    href={
                      "/user?mid=" +
                      videoInfo.reduxAsyncConnect.videoInfo.owner.mid
                    }
                    rel="noopener noreferrer"
                  >
                    {videoInfo.reduxAsyncConnect.videoInfo.owner.name}
                  </a>
                </span>
                <span>
                  {formatNumber(
                    videoInfo.reduxAsyncConnect.videoInfo.stat.view
                  )}{" "}
                  次观看
                </span>
                <span>
                  {formatNumber(
                    videoInfo.reduxAsyncConnect.videoInfo.stat.danmaku
                  )}{" "}
                  条弹幕
                </span>
                <span>
                  {this.timeTodate(
                    videoInfo.reduxAsyncConnect.videoInfo.pubdate
                  )}
                </span>
              </div>
              <div className="video-desc">
                {videoInfo.reduxAsyncConnect.videoInfo.desc}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="loadVideo">
          <ActivityIndicator text="正在加载..." size="large" />
        </div>
      );
    }
  }
}

export default Player;
