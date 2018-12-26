import React, { Component } from "react";
import "./index.css";
import "antd-mobile/dist/antd-mobile.css";
import "./index.css";
import { domain, partitionList } from "../../config";
import axios from "axios";
import { Toast } from "antd-mobile";
import SwiperBox from "../swiper";
import NavBox from "../navbox";
import CardBox from "../card";
import SubBox from "../subbox";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { regionList: [], ridIndex: 0 };
  }
  clearActivate = (node, ele, clasname) => {
    node.childNodes.forEach(item => {
      if (item.querySelector(ele).className.includes(clasname)) {
        item.querySelector(ele).className = item
          .querySelector(ele)
          .className.replace(clasname, "");
      }
    });
  };
  onTabChange = (tab, index, list) => {
    this.clearActivate(list, "p", " activate");
    list.childNodes[index].querySelector("p").className += " activate";
    let subs = [{ title: "推荐", tid: tab.tid }, ...partitionList[tab.tid]];
    this.setState({ ridIndex: tab.tid });
    this.getRegionList(tab.tid, subs);
  };

  getRegionList = (rid, subs) => {
    rid = rid || 0;
    subs = subs || [];
    // Toast.loading("正在加载中...", 0, () => {}, true);
    if (rid == 0) {
      axios.get(domain + "/rank?rid=119&day=3").then(res => {
        this.setState({ regionList: res.data.list.data.list });
        // Toast.hide();
      });
    } else {
      axios
        .get(domain + "/region?rid=" + rid + "&subs=" + JSON.stringify(subs))
        .then(res => {
          console.log(res);
        });
    }
  };
  componentDidMount() {
    this.getRegionList();
  }
  render() {
    const { regionList } = this.state;
    return (
      <div>
        <NavBox onTabChange={this.onTabChange} />
        <div className="index-container">
          {this.state.ridIndex == 0 && <SwiperBox />}
          {this.state.ridIndex > 0 && (
            <SubBox
              tabs={[
                { title: "推荐", tid: this.state.ridIndex },
                ...partitionList[this.state.ridIndex]
              ]}
            />
          )}
          {/* {this.state.firstList.length > 0 && (
            <div className="card-list">
              {this.state.firstList.map((item, key) => {
                if (key < 60) {
                  return (
                    <CardBox
                      key={key}
                      localaddress={item.localaddress}
                      title={item.title}
                    />
                  );
                }
              })}
            </div>
          )} */}
        </div>
      </div>
    );
  }
}

export default Main;
