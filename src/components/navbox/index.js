import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import "./index.css";
import { Tabs } from "antd-mobile";
class NavBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      positionX: 0
    };
  }

  findInPartMore = () => {
    if (this.partMore.className.includes("fadeOutUp")) {
      this.partMore.className = this.partMore.className.replace(
        "fadeOutUp",
        "fadeInDown"
      );
    } else {
      this.partMore.className += " fadeInDown showPart";
    }
  };
  hiddenPartMore = () => {
    this.partMore.className = this.partMore.className.replace(
      "fadeInDown",
      "fadeOutUp"
    );
  };
  componentDidMount() {}
  partMoreChange = e => {
    let target;
    if (e.target.nodeName == "LI") {
      this.clearActivate(this.partMoreList);
      target = e.target;
      e.target.querySelector("p").className += " activate";
    } else if (e.target.nodeName == "P") {
      this.clearActivate(this.partMoreList);
      target = e.target.parentNode;
      e.target.className += " activate";
    }
    this.tabs.props.goToTab(parseInt(target.getAttribute("sortid")));
    this.hiddenPartMore();
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
  render() {
    const { onTabChange } = this.props;

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
      { title: "相簿", tid: 999 }
    ];

    return (
      <div className="NavBox">
        <div
          className="part_box_more  animated fast"
          ref={node => {
            this.partMore = node;
          }}
        >
          <ul
            className="part_more"
            ref={node => {
              this.partMoreList = node;
            }}
            onClick={e => {
              this.partMoreChange(e);
            }}
          >
            <li tid={0} sortid={0}>
              <p className=" activate">首页</p>
            </li>
            <li tid={1} sortid={1}>
              <p>动画</p>
            </li>
            <li tid={13} sortid={2}>
              <p>番剧</p>
            </li>
            <li tid={167} sortid={3}>
              <p>国创</p>
            </li>
            <li tid={3} sortid={4}>
              <p>音乐</p>
            </li>
            <li tid={129} sortid={5}>
              <p>舞蹈</p>
            </li>
            <li tid={36} sortid={6}>
              <p>科技</p>
            </li>
            <li tid={4} sortid={7}>
              <p>游戏</p>
            </li>
            <li tid={5} sortid={8}>
              <p>娱乐</p>
            </li>
            <li tid={119} sortid={9}>
              <p>鬼畜</p>
            </li>
            <li tid={23} sortid={10}>
              <p>电影</p>
            </li>
            <li tid={11} sortid={11}>
              <p>电视剧</p>
            </li>
            <li tid={177} sortid={12}>
              <p>纪录片</p>
            </li>
            <li tid={181} sortid={13}>
              <p>影视</p>
            </li>
            <li tid={155} sortid={14}>
              <p>时尚</p>
            </li>
            <li tid={160} sortid={15}>
              <p>生活</p>
            </li>
            <li tid={165} sortid={16}>
              <p>广告</p>
            </li>
            <li tid={999} sortid={17}>
              <p>相册</p>
            </li>
          </ul>
          <div
            className="hidden_part_more"
            onClick={() => this.hiddenPartMore()}
          >
            <i className="fa fa-angle-up" />
          </div>
        </div>
        <div
          className="part_box_one"
          ref={node => {
            this.part_box = node;
          }}
        >
          <div className="part_content">
            <Tabs
              tabBarTextStyle={{
                fontSize: "2.5vh",
                height: "3.5vh",
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
          <div className="showmore" onClick={() => this.findInPartMore()}>
            <i className="fa fa-angle-down" />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBox;
