import React, { Component } from "react";
import "./index.css";
import TouchBox from "../touchBox";
class NavBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      positionX: 0
    };
  }
  onSwipeStart = event => {
    const startPos = parseInt(this.partlist.style.left) || 0;
    this.setState({ left: startPos });
  };
  onSwipeMove = (position, event) => {
    this.setState({ positionX: position.x });
    if (this.state.left == 0 && position.x > 0) {
      this.partlist.style.left = 0;
      return false;
    } else if (
      position.x < 0 &&
      this.partlist.offsetWidth +
        (this.partlist.offsetLeft - this.part_box.offsetWidth) <=
        0
    ) {
      this.partlist.style.left =
        this.part_box.offsetWidth - this.partlist.offsetWidth + "px";
      return false;
    } else if (position.x > 0 && this.partlist.offsetLeft - position.x <= 0) {
      this.partlist.style.left = 0 + "px";
      return false;
    } else {
      this.partlist.style.left = this.state.left + position.x + "px";
      return false;
    }
  };
  onSwipeEnd = event => {
    if (
      this.state.positionX < 0 &&
      this.partlist.offsetWidth +
        (this.partlist.offsetLeft - this.part_box.offsetWidth) <=
        0
    ) {
      this.partlist.style.left =
        this.part_box.offsetWidth - this.partlist.offsetWidth + "px";
    } else if (
      this.state.positionX > 0 &&
      this.partlist.offsetLeft - this.state.positionX <= 0
    ) {
      this.partlist.style.left = 0;
    }
    const startPos = parseInt(this.partlist.style.left) || 0;
    this.setState({ left: startPos });
  };

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
  partChange = e => {
    if (e.target.nodeName == "LI") {
      this.clearActivate(this.partlist);
      e.target.querySelector("p").className += " activate";
      this.clearActivate(this.partMoreList);
      if (
        !this.partMoreList.childNodes[e.target.attributes[1].value]
          .querySelector("p")
          .className.includes(" activate")
      ) {
        this.partMoreList.childNodes[
          e.target.attributes[1].value
        ].querySelector("p").className += " activate";
      }
    } else if (e.target.nodeName == "P") {
      this.clearActivate(this.partlist);
      e.target.className += " activate";
      this.clearActivate(this.partMoreList);
      if (
        !this.partMoreList.childNodes[e.target.parentNode.attributes[1].value]
          .querySelector("p")
          .className.includes(" activate")
      ) {
        this.partMoreList.childNodes[
          e.target.parentNode.attributes[1].value
        ].querySelector("p").className += " activate";
      }
    }
  };
  partMoreChange = e => {
    if (e.target.nodeName == "LI") {
      this.clearActivate(this.partMoreList);
      e.target.querySelector("p").className += " activate";
      if (
        !this.partlist.childNodes[e.target.attributes[1].value]
          .querySelector("p")
          .className.includes(" activate")
      ) {
        this.clearActivate(this.partlist);
        this.partlist.childNodes[e.target.attributes[1].value].querySelector(
          "p"
        ).className += " activate";
        if (e.target.attributes[1].value == 0) {
          this.partlist.style.left = "0";
        } else if (e.target.attributes[1].value >= 13) {
          this.partlist.style.left =
            -this.partlist.childNodes[13].offsetLeft + "px";
        } else {
          this.partlist.style.left =
            -(
              this.partlist.childNodes[e.target.attributes[1].value]
                .offsetLeft -
              this.partlist.childNodes[e.target.attributes[1].value].offsetWidth
            ) + "px";
        }
      }
    } else if (e.target.nodeName == "P") {
      this.clearActivate(this.partMoreList);
      e.target.className += " activate";
      if (
        !this.partlist.childNodes[e.target.parentNode.attributes[1].value]
          .querySelector("p")
          .className.includes(" activate")
      ) {
        this.clearActivate(this.partlist);
        this.partlist.childNodes[
          e.target.parentNode.attributes[1].value
        ].querySelector("p").className += " activate";
      }
      if (e.target.parentNode.attributes[1].value == 0) {
        this.partlist.style.left = 0;
      } else if (e.target.parentNode.attributes[1].value >= 13) {
        this.partlist.style.left =
          -this.partlist.childNodes[13].offsetLeft + "px";
      } else {
        this.partlist.style.left =
          -(
            this.partlist.childNodes[e.target.parentNode.attributes[1].value]
              .offsetLeft -
            this.partlist.childNodes[e.target.parentNode.attributes[1].value]
              .offsetWidth
          ) + "px";
      }
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
            <li tid={"xxx"} sortid={17}>
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
            <TouchBox
              onSwipeStart={this.onSwipeStart}
              onSwipeMove={this.onSwipeMove}
              onSwipeEnd={this.onSwipeEnd}
            >
              <ul
                className="part_box"
                ref={node => {
                  this.partlist = node;
                }}
                onClick={e => {
                  this.partChange(e);
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
                <li tid={"xxx"} sortid={17}>
                  <p>相册</p>
                </li>
              </ul>
            </TouchBox>
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
