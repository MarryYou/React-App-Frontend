import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import "./index.css";
import { Tabs } from "antd-mobile";
class RankBox extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  renderContent = tab => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "7vh",
        backgroundColor: "#fff"
      }}
    >
      <p>Content of {tab.title}</p>
    </div>
  );
  render() {
    const { onTabChange } = this.props;
    const tabs = [
      { title: "首页", tid: 0 },
      { title: "动画", tid: 1 },
      { title: "番剧", tid: 33 },
      { title: "国创", tid: 168 },
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
      { title: "生活", tid: 160 }
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
            destroyInactiveTab={true}
            tabBarActiveTextColor="#fb7299"
            tabBarUnderlineStyle={{
              borderColor: "#fb7299",
              borderWidth: ".22vw"
            }}
            onChange={tab => onTabChange(tab)}
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

export default RankBox;
