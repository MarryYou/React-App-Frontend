import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import { domain, partitionList } from "../../config";
import axios from "axios";
import { Toast } from "antd-mobile";
import SwiperBox from "../swiper";
import NavBox from "../navbox";
import CardBox from "../card";
import SubBox from "../subbox";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import "./index.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionList: [],
      ridIndex: 0,
      subRegionFlag: false,
      subRegionList: []
    };
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
    let subs = [];
    if (partitionList[tab.tid]) {
      subs = [{ title: "推荐", tid: tab.tid }, ...partitionList[tab.tid]];
    }
    this.setState({ regionList: [] });
    this.setState({ ridIndex: tab.tid });
    this.getRegionList(tab.tid, subs);
  };
  onSubTabChange = (tab, index) => {
    if (index == 0) {
      this.setState({ subRegionFlag: false });
      this.setState({ regionList: [] });
      this.getRegionList(tab.tid, [
        { title: "推荐", tid: tab.tid },
        ...partitionList[tab.tid]
      ]);
    } else {
      this.setState({ subRegionFlag: true });
      this.setState({ regionList: [] });
      this.getSubregion(tab.tid);
    }
  };
  getRegionList = (rid, subs) => {
    rid = rid || 0;
    subs = subs || [];
    Toast.loading("正在加载中...", 0, () => {}, true);
    if (rid == 0) {
      axios.get(domain + "/rank?rid=119&day=3").then(res => {
        Toast.hide();
        this.setState({ regionList: res.data.list.data.list });
      });
    } else {
      axios
        .get(domain + "/region?rid=" + rid + "&subs=" + JSON.stringify(subs))
        .then(res => {
          Toast.hide();
          this.setState({ regionList: res.data.data });
        });
    }
  };
  getSubregion = (rid, classify, page) => {
    rid = rid || 1;
    classify = classify || null;
    page = page || 1;
    Toast.loading("正在加载中...", 0, () => {}, true);
    if (classify != null) {
      axios
        .get(
          domain +
            "/subregion?rid=" +
            rid +
            "&classify=" +
            classify +
            "&page=" +
            page
        )
        .then(res => {
          console.log(res);
        });
    } else {
      axios.get(domain + "/subregion?rid=" + rid).then(res => {
        Toast.hide();
        this.setState({ subRegionList: res.data });
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
              onTabChange={this.onSubTabChange}
            />
          )}
          <div className="f-card">
            {this.state.ridIndex == 0 &&
              regionList.length > 0 &&
              regionList.map((item, key) => {
                if (key < 20) {
                  return (
                    <CardBox
                      key={key}
                      localaddress={item.localaddress}
                      title={item.title}
                    />
                  );
                }
              })}
            {this.state.ridIndex != 0 &&
              this.state.subRegionFlag == false &&
              regionList.map((item, key) => {
                return (
                  <Card key={key} full={true}>
                    {key == 0 && <Card.Header title="热门推荐" />}
                    {key > 0 && <Card.Header title={item.name} />}
                    <Card.Body>
                      <div className="classify-container">
                        {item.list &&
                          item.list.map((subItem, subkey) => {
                            if (subkey < 4) {
                              return (
                                <CardBox
                                  key={subkey}
                                  localaddress={subItem.localaddress}
                                  title={subItem.title}
                                />
                              );
                            }
                          })}
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            {/* 
            {this.state.subRegionFlag == true && (
              <Card full={true}>
                <Card.Header title="热门推荐" />
                <Card.Body>
                  <div className="classify-container">
                    {this.state.subRegionList.news.archives.map(
                      (item, index) => {
                        return <div>{index}</div>;
                      }
                    )}
                  </div>
                </Card.Body>
              </Card>
            )} */}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
