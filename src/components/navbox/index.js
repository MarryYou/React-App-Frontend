import React, { Component } from "react";
import "./index.css";
class NavBox extends Component {
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
  partChange = e => {
    if (e.target.nodeName == "LI") {
      this.clearActivate(this.partlist);
      e.target.querySelector("p").className += " activate";
    } else if (e.target.nodeName == "P") {
      this.clearActivate(this.partlist);
      e.target.className += " activate";
    }
  };
  partMoreChange = e => {
    if (e.target.nodeName == "LI") {
      this.clearActivate(this.partMoreList);
      e.target.querySelector("p").className += " activate";
    } else if (e.target.nodeName == "P") {
      this.clearActivate(this.partMoreList);
      e.target.className += " activate";
    }

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
            <li tid={0}>
              <p className=" activate">首页</p>
            </li>
            <li tid={1}>
              <p>动画</p>
            </li>
            <li tid={13}>
              <p>番剧</p>
            </li>
            <li tid={167}>
              <p>国创</p>
            </li>
            <li tid={3}>
              <p>音乐</p>
            </li>
            <li tid={129}>
              <p>舞蹈</p>
            </li>
            <li tid={36}>
              <p>科技</p>
            </li>
            <li tid={4}>
              <p>游戏</p>
            </li>
            <li tid={5}>
              <p>娱乐</p>
            </li>
            <li tid={119}>
              <p>鬼畜</p>
            </li>
            <li tid={23}>
              <p>电影</p>
            </li>
            <li tid={11}>
              <p>电视剧</p>
            </li>
            <li tid={177}>
              <p>纪录片</p>
            </li>
            <li tid={181}>
              <p>影视</p>
            </li>
            <li tid={155}>
              <p>时尚</p>
            </li>
            <li tid={160}>
              <p>生活</p>
            </li>
            <li tid={165}>
              <p>广告</p>
            </li>
            <li>
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
        <div className="part_box_one">
          <div className="part_content">
            <ul
              className="part_box"
              ref={node => {
                this.partlist = node;
              }}
              onClick={e => {
                this.partChange(e);
              }}
            >
              <li tid={0} selectId="0">
                <p className=" activate">首页</p>
              </li>
              <li tid={1} selectId="1">
                <p>动画</p>
              </li>
              <li tid={13} selectId="2">
                <p>番剧</p>
              </li>
              <li
                tid={167}
                selectId="3
            "
              >
                <p>国创</p>
              </li>
              <li tid={3}>
                <p>音乐</p>
              </li>
              <li tid={129}>
                <p>舞蹈</p>
              </li>
              <li tid={36}>
                <p>科技</p>
              </li>
              <li tid={4}>
                <p>游戏</p>
              </li>
              <li tid={5}>
                <p>娱乐</p>
              </li>
              <li tid={119}>
                <p>鬼畜</p>
              </li>
              <li tid={23}>
                <p>电影</p>
              </li>
              <li tid={11}>
                <p>电视剧</p>
              </li>
              <li tid={177}>
                <p>纪录片</p>
              </li>
              <li tid={181}>
                <p>影视</p>
              </li>
              <li tid={155}>
                <p>时尚</p>
              </li>
              <li tid={160}>
                <p>生活</p>
              </li>
              <li tid={165}>
                <p>广告</p>
              </li>
              <li>
                <p>相册</p>
              </li>
            </ul>
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
