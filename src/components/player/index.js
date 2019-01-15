import React, { Component } from "react";
import { CanvasBarrage } from "./canvasBarrage";
import axios from "axios";
import { domain } from "../../config";
import { Toast, ActivityIndicator } from "antd-mobile";
import "./index.css";
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { videoInfo: {} };
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
  }
  render() {
    const videoInfo = this.state.videoInfo;
    if (videoInfo.reduxAsyncConnect) {
      return (
        <div className="Player">
          <canvas id="canvasBarrage" className="canvas-barrage" />
          <video
            id="videoBarrage"
            preload="auto"
            controls="controls"
            controlsList="nodownload"
          >
            <source
              src={"http:" + videoInfo.reduxAsyncConnect.videoInfo.initUrl}
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
                  {videoInfo.reduxAsyncConnect.videoInfo.owner.name}
                </span>
                <span>
                  {videoInfo.reduxAsyncConnect.videoInfo.stat.view} 次观看
                </span>
                <span>
                  {videoInfo.reduxAsyncConnect.videoInfo.stat.danmaku} 条弹幕
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
