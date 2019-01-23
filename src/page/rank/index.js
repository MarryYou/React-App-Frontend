import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import { SegmentedControl, Toast } from "antd-mobile";
import "./index.css";
import RankBox from "../../components/rankBox";
import RankCard from "../../components/rankcard";
import { domain, partitionList } from "../../config";
import axios from "axios";

const SegmentNumber = [1, 3, 7];
class Rank extends Component {
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
                  let path = "/video?avId=" + item.aid;
                  return (
                    <RankCard
                      key={key}
                      rankIndex={key}
                      rankImg={item.localaddress}
                      path={path}
                      rankTitle={item.title}
                      rankSort={true}
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
export default Rank;
