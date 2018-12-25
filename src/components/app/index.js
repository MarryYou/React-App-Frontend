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
import RankCard from "../rankcard";
import { domain } from "../../config";
import axios from "axios";
import { SegmentedControl } from "antd-mobile";
const index = () => (
  <div>
    <NavBox />
    <div className="card-container">
      <SwiperBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
      <CardBox />
    </div>
  </div>
);
// const rank = () => (
//   <div className="card-container">
//     <RankBox />
//     <div className="card-list">
//       <RankCard rankIndex={0} />
//       <RankCard rankIndex={1} />
//       <RankCard rankIndex={2} />
//       <RankCard rankIndex={3} />
//       <RankCard rankIndex={4} />
//     </div>
//   </div>
// );

const search = () => <div />;
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
    axios.get(domain + "/rank?rid=" + rid + "&day=" + day).then(res => {
      this.setState({ rankList: res.data.list.data.list });
    });
  };
  componentDidMount() {
    this.getRankList();
  }
  render() {
    const rankList = this.state.rankList;
    if (rankList.length > 0) {
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
    } else {
      return (
        <div className="card-container">
          <RankBox />
        </div>
      );
    }
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
            <Route exact path="/" component={index} />
            <Route path="/rank" component={rank} />
            <Route path="/search" component={search} />
            <Route path="/project" component={project} />
          </main>
          <TabBarBox />
        </div>
      </Router>
    );
  }
}

export default App;
