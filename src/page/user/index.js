import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import { Card } from "antd-mobile";
import RankCard from "../../components/rankcard";
import "./index.css";
import axios from "axios";
import { domain, formatNumber } from "../../config";
import CardFooter from "antd-mobile/lib/card/CardFooter";
const bg = "url(" + domain + "/static/image/icon/user_banner.png)";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      vipInfo: {},
      statInfo: {},
      videoInfo: {}
    };
  }
  getuserInfo = () => {
    const mid = this.props.location.search.split("=")[1] || 0;
    axios.get(domain + "/userInfo?mid=" + mid).then(res => {
      console.log(res);
    });
  };
  getvipstatus = () => {
    const mid = this.props.location.search.split("=")[1] || 0;
    axios.get(domain + "/vipstatus?mid=" + mid).then(res => {
      this.setState({ vipInfo: res.data.data });
    });
  };
  getstat = () => {
    const mid = this.props.location.search.split("=")[1] || 0;
    axios.get(domain + "/stat?mid=" + mid).then(res => {
      this.setState({ statInfo: res.data.data });
    });
  };
  getSubmitVideo = () => {
    const mid = this.props.location.search.split("=")[1] || 0;
    axios.get(domain + "/SubmitVideo?mid=" + mid).then(res => {
      this.setState({ videoInfo: res.data.data });
    });
  };
  componentDidMount() {
    // this.getuserInfo();
    this.getvipstatus();
    this.getstat();
    this.getSubmitVideo();
  }
  render() {
    return (
      <div className="User">
        <div className="user-banner" style={{ backgroundImage: bg }}>
          <div className="user-info-box">
            <div className="user-info">
              {!this.state.vipInfo ? (
                <img
                  className="avatar"
                  src={domain + "/static/image/avatar/6792899.png"}
                  alt=""
                />
              ) : (
                <img
                  className="avatar"
                  src={domain + "/static/image/icon/noface.gif"}
                  alt=""
                />
              )}

              {this.state.vipInfo.vipStatus == 1 && (
                <img
                  className="bigVip"
                  src={domain + "/static/image/icon/big.png"}
                  alt=""
                />
              )}
            </div>

            <div className="vip">
              {this.state.vipInfo.vipStatus == 1 && <span>大会员</span>}
            </div>
          </div>
        </div>

        <div className="upinfo">
          <div className="top">
            <span className="upname">XXX</span>
            <div className="sex">
              <svg
                id="icon-nv"
                viewBox="0 0 1024 1024"
                fill="#fb7299"
                width="2.5vh"
              >
                <path d="M774.4 96c-48-35.2-108.8-51.2-172.8-51.2-105.6 0-208 51.2-268.8 150.4-89.6 134.4-57.6 313.6 60.8 416l-32 51.2-188.8-121.6S128 512 108.8 544c-22.4 35.2 22.4 64 22.4 64l188.8 121.6-105.6 163.2s-19.2 32 16 51.2c38.4 22.4 57.6-12.8 57.6-12.8l102.4-160 185.6 121.6s48 28.8 70.4-6.4c19.2-28.8-25.6-57.6-25.6-57.6L432 704l32-48c44.8 22.4 92.8 32 137.6 32 105.6 0 208-51.2 268.8-150.4 96-147.2 51.2-345.6-96-441.6z m35.2 400c-44.8 67.2-118.4 108.8-201.6 108.8-44.8 0-92.8-12.8-131.2-38.4-112-73.6-147.2-220.8-73.6-332.8 44.8-64 121.6-105.6 201.6-108.8 44.8 0 92.8 12.8 131.2 38.4 112 73.6 147.2 220.8 73.6 332.8z" />
              </svg>
            </div>
            <span className="level">
              <img
                src="http://localhost:8086/static/image/icon/lv6.png"
                alt=""
              />
            </span>
            <span className="uid">
              UID: {this.props.location.search.split("=")[1]}
            </span>
          </div>
          <div className="mid">
            <span className="following">
              {formatNumber(this.state.statInfo.following)}{" "}
              <i className="particle"> 关注</i>
            </span>
            <span className="follower">
              {formatNumber(this.state.statInfo.follower)}
              <i className="particle"> 粉丝</i>
            </span>
          </div>
          <div className="bottom">
            <p className="abstract">
              混剪不定期更新。wb@竹棘sumi混剪不定期更新。wb@竹棘sumi混剪不定期更新。wb@竹棘sumi混剪不定期更新。wb@竹棘sumi
            </p>
          </div>
        </div>
        <div>
          <Card full>
            <Card.Header title="Ta的投稿" />
            <Card.Body>
              {this.state.videoInfo && (
                <div>
                  {this.state.videoInfo.vlist &&
                    this.state.videoInfo.vlist.map((item, key) => {
                      let path = "/video?avId=" + item.aid;
                      return (
                        <RankCard
                          key={key}
                          rankIndex={key}
                          rankImg={item.localaddress}
                          path={path}
                          rankTitle={item.title}
                          rankSort={false}
                          mid={this.props.location.search.split("=")[1]}
                          upName={item.author}
                          videoNumber={item.play}
                          danmuNumber={item.video_review}
                        />
                      );
                    })}
                </div>
              )}
              <div className="footer" />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
export default User;
