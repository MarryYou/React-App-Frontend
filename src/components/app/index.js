import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "antd-mobile/dist/antd-mobile.css";
import "./index.css";
import Header from "../header";
import TabBarBox from "../tabbar";
import SwiperBox from "../swiper";
import NavBox from "../navbox";
import CardBox from "../card";
import RankBox from "../rankBox";
import SubBox from "../subbox";
import RankCard from "../rankcard";
import { domain, partitionList } from "../../config";
import axios from "axios";
import { SegmentedControl, Toast } from "antd-mobile";
import Main from "../main";
import { Duplex } from "stream";

const project = () => (
  <div>
    <p>project page</p>
  </div>
);
const SegmentNumber = [1, 3, 7];
class rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankList: [],
      segmentCheckIndex: 1,
      ridIndex: 0
    };
  }

  onTabChange = tab => {
    this.setState({ ridIndex: tab.tid });
    this.getRankList(tab.tid, SegmentNumber[this.state.segmentCheckIndex]);
  };
  onSegmentChange = e => {
    let Index = e.nativeEvent.selectedSegmentIndex;
    this.setState({ segmentCheckIndex: Index });
    this.getRankList(this.state.ridIndex, SegmentNumber[Index]);
  };
  getRankList = (rid, day) => {
    rid = rid || 0;
    day = day || 3;
    Toast.loading(
      "正在加载中...",
      0,
      () => {
        // console.log("Load ....");
      },
      true
    );
    this.setState({ rankList: [] });
    axios.get(domain + "/rank?rid=" + rid + "&day=" + day).then(res => {
      this.setState({ rankList: res.data.list.data.list });
      Toast.hide();
    });
  };
  componentDidMount() {
    this.getRankList();
  }
  render() {
    const rankList = this.state.rankList;
    return (
      <div>
        <RankBox onTabChange={this.onTabChange} />
        <SegmentedControl
          className="segment-update"
          selectedIndex={this.state.segmentCheckIndex}
          values={["最近一天", "最近三天", "最近一周"]}
          onChange={e => this.onSegmentChange(e)}
        />
        <div className="card-container">
          {this.state.rankList.length > 0 && (
            <div className="card-list">
              {rankList.map((item, key) => {
                if (key < 30) {
                  return (
                    <RankCard
                      key={key}
                      rankIndex={key}
                      rankImg={item.localaddress}
                      rankTitle={item.title}
                      upName={item.author}
                      videoNumber={item.play}
                      danmuNumber={item.video_review}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { videoInfo: {} };
  }
  getVideo = () => {
    axios.get(domain + "/video").then(res => {
      this.setState({ videoInfo: res.data });
    });
  };

  componentDidMount() {
    this.getVideo();
  }
  render() {
    return <div />;
  }
}
class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main className="container">
            <Route exact path="/" component={Main} />
            <Route path="/rank" component={rank} />
            <Route path="/search" component={Search} />
            <Route path="/project" component={project} />
          </main>
          <TabBarBox />
        </div>
      </Router>
    );
  }
}

export default App;
