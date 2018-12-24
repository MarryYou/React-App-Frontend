import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import "./index.css";
import { Tabs, WhiteSpace } from "antd-mobile";
class RankBox extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  partChange = e => {
    if (e.target.nodeName == "LI") {
      this.clearActivate(this.partlist);
      e.target.querySelector("p").className += " activate";
    } else if (e.target.nodeName == "P") {
      this.clearActivate(this.partlist);
      e.target.className += " activate";
    }
  };

  onTabClick = tab => {
    console.log(tab);
  };

  clearActivate = node => {
    node.childNodes.forEach(item => {
      if (item.querySelector("p").className.includes(" activate")) {
        item.querySelector("p").className = item
          .querySelector("p")
          .className.replace(" activate", "");
      }
    });
  };
  renderContent = tab => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "150px",
        backgroundColor: "#fff"
      }}
    >
      <p>Content of {tab.title}</p>
    </div>
  );
  render() {
    const tabs = [
      { title: "首页", tid: 0 },
      { title: "动画", tid: 1 },
      { title: "番剧", tid: 13 },
      { title: "国创", tid: 167 },
      { title: "音乐", tid: 3 },
      { title: "舞蹈", tid: 129 },
      { title: "科技", tid: 36 },
      { title: "游戏", tid: 4 },
      { title: "娱乐", tid: 5 },
      { title: "鬼畜", tid: 119 },
      { title: "电影", tid: 23 },
      { title: "电视剧", tid: 11 },
      { title: "纪录片", tid: 177 },
      { title: "影视", tid: 181 },
      { title: "时尚", tid: 155 },
      { title: "生活", tid: 160 },
      { title: "广告", tid: 165 },
      { title: "相簿", tid: 999 }
    ];
    return (
      <div className="RankBox">
        <div
          className="part_box_one"
          ref={node => {
            this.part_box = node;
          }}
        >
          <Tabs
            tabBarTextStyle={{
              fontSize: "2.5vh",
              height: "4vh",
              paddingBottom: "1.5vh"
            }}
            tabs={tabs}
            tabBarActiveTextColor="#fb7299"
            tabBarUnderlineStyle={{
              borderColor: "#fb7299"
            }}
            onChange={this.tabsChange}
            onTabClick={this.onTabClick}
            initialPage={this.initialPage}
            renderTabBar={props => {
              return (
                <Tabs.DefaultTabBar
                  ref={node => {
                    this.tabs = node;
                  }}
                  {...props}
                  page={5}
                />
              );
            }}
          />
        </div>
      </div>
    );
  }
}

/**
 *             // <ul
            //   className="part_box"
            //   ref={node => {
            //     this.partlist = node;
            //   }}
            //   onClick={e => {
            //     this.partChange(e);
            //   }}
            // >
            //   <li tid={0} sortid={0}>
            //     <p className=" activate">全站</p>
            //   </li>
            //   <li tid={1} sortid={1}>
            //     <p>动画</p>
            //   </li>
            //   <li tid={13} sortid={2}>
            //     <p>番剧</p>
            //   </li>
            //   <li tid={167} sortid={3}>
            //     <p>国创</p>
            //   </li>
            //   <li tid={3} sortid={4}>
            //     <p>音乐</p>
            //   </li>
            //   <li tid={129} sortid={5}>
            //     <p>舞蹈</p>
            //   </li>
            //   <li tid={36} sortid={6}>
            //     <p>科技</p>
            //   </li>
            //   <li tid={4} sortid={7}>
            //     <p>游戏</p>
            //   </li>
            //   <li tid={5} sortid={8}>
            //     <p>娱乐</p>
            //   </li>
            //   <li tid={119} sortid={9}>
            //     <p>鬼畜</p>
            //   </li>
            //   <li tid={23} sortid={10}>
            //     <p>电影</p>
            //   </li>
            //   <li tid={11} sortid={11}>
            //     <p>电视剧</p>
            //   </li>
            //   <li tid={177} sortid={12}>
            //     <p>纪录片</p>
            //   </li>
            //   <li tid={181} sortid={13}>
            //     <p>影视</p>
            //   </li>
            //   <li tid={155} sortid={14}>
            //     <p>时尚</p>
            //   </li>
            //   <li tid={160} sortid={15}>
            //     <p>生活</p>
            //   </li>
            // </ul>
 */
export default RankBox;
