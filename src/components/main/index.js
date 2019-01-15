import React, { Component } from "react";
import { Link } from "react-router-dom";
import "antd-mobile/dist/antd-mobile.css";
import { domain, partitionList } from "../../config";
import axios from "axios";
import { Toast } from "antd-mobile";
import SwiperBox from "../swiper";
import NavBox from "../navbox";
import CardBox from "../card";
import SubBox from "../subbox";
import { Card, WingBlank, WhiteSpace, Button } from "antd-mobile";
import "./index.css";
import CardFooter from "antd-mobile/lib/card/CardFooter";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionList: [],
      ridIndex: 0,
      subRegionFlag: false,
      subRegionList: [],
      subNewspage: 1,
      subRidIndex: 1
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
      this.setState({ subRegionList: [] });
    } else {
      this.setState({ subRegionFlag: true });
      this.setState({ regionList: [] });
      this.setState({ subRegionList: [] });
      this.getSubregion(tab.tid);
    }
    this.setState({ subRidIndex: tab.tid });
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
  newsLoadMore = () => {
    this.setState({ subNewspage: this.state.subNewspage + 1 });
    axios
      .get(
        domain +
          "/subregion?rid=" +
          this.state.subRidIndex +
          "&classify=news" +
          "&page=" +
          (this.state.subNewspage + 1)
      )
      .then(res => {
        let newList = this.state.subRegionList.news.concat(res.data.news);
        this.setState({
          subRegionList: {
            recommand: this.state.subRegionList.recommand,
            news: newList
          }
        });
      });
  };
  getSubregion = (rid, classify, page) => {
    rid = rid || 1;
    classify = classify || null;
    page = page || 1;
    Toast.loading("正在加载中...", 0, () => {}, true);
    axios.get(domain + "/subregion?rid=" + rid).then(res => {
      Toast.hide();
      this.setState({ subRegionList: res.data });
    });
  };
  componentDidMount() {
    this.getRegionList();
  }
  render() {
    const { regionList, subRegionList } = this.state;
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
              ref={node => {
                this.tabs = node;
              }}
            />
          )}
          <div className="f-card">
            {this.state.ridIndex == 0 &&
              regionList.length > 0 &&
              regionList.map((item, key) => {
                if (key < 20) {
                  let path = "/video?avId=" + item.aid;
                  return (
                    <CardBox
                      key={key}
                      path={path}
                      localaddress={item.localaddress}
                      title={item.title}
                    />
                  );
                }
              })}
            {this.state.ridIndex != 0 &&
              this.state.subRegionFlag == false &&
              regionList.map((item, index) => {
                return (
                  <Card key={index} full={true}>
                    {index == 0 && <Card.Header title="热门推荐" />}
                    {index > 0 && (
                      <Card.Header
                        title={item.name}
                        extra={
                          <div
                            style={{
                              fontSize: "2.3vh",
                              paddingRight: "4vw"
                            }}
                            onClick={() => {
                              this.tabs.tabs.props.goToTab(index);
                            }}
                          >
                            查看更多>
                          </div>
                        }
                      />
                    )}
                    <Card.Body>
                      <div className="classify-container">
                        {item.list &&
                          item.list.map((subItem, subkey) => {
                            if (subkey < 4) {
                              let path = "/video?avId=" + subItem.aid;
                              return (
                                <CardBox
                                  key={subkey}
                                  path={path}
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

            {this.state.subRegionFlag == true && subRegionList.recommand && (
              <Card full={true}>
                <Card.Header title="热门推荐" />
                <Card.Body>
                  <div className="classify-container">
                    {subRegionList.recommand &&
                      subRegionList.recommand.map((item, key) => {
                        if (key < 4) {
                          let path = "/video?avId=" + item.aid;
                          return (
                            <CardBox
                              key={key}
                              path={path}
                              localaddress={item.localaddress}
                              title={item.title}
                            />
                          );
                        }
                      })}
                  </div>
                </Card.Body>
              </Card>
            )}
            {this.state.subRegionFlag == true && subRegionList.news && (
              <Card full={true}>
                <Card.Header title="最新视频" />
                <Card.Body>
                  <div className="classify-container">
                    {subRegionList.news &&
                      subRegionList.news.map((item, key) => {
                        let path = "/video?avId=" + item.aid;
                        return (
                          <CardBox
                            key={key}
                            path={path}
                            localaddress={item.localaddress}
                            title={item.title}
                          />
                        );
                      })}
                  </div>
                </Card.Body>
                <Button
                  className="news-loadMore"
                  onClick={() => this.newsLoadMore()}
                >
                  点击加载更多
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
