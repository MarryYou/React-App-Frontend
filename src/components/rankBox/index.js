import React, { Component } from "react";
import "./index.css";
import TouchBox from "../touchBox";
class RankBox extends Component {
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
      <div className="RankBox">
        <div
          className="part_box_one"
          ref={node => {
            this.part_box = node;
          }}
        >
          <div className="part_content">
            {/* <TouchBox
              onSwipeStart={this.onSwipeStart}
              onSwipeMove={this.onSwipeMove}
              onSwipeEnd={this.onSwipeEnd}
            > */}
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
                <p className=" activate">全站</p>
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
            </ul>
            {/* </TouchBox> */}
          </div>
        </div>
      </div>
    );
  }
}

export default RankBox;
