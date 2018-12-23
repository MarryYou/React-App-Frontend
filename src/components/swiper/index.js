import React, { Component } from "react";
import { Swiper, Flex, FlexItem } from "react-weui";
import "weui";
import "react-weui/build/packages/react-weui.css";
import "./index.css";
import axios from "axios";
import ReactSwiper from "reactjs-swiper";
class SwiperBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperOptions: {
        preloadImages: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false
      },
      bannerList: []
    };
  }
  getBannerList = () => {
    return axios.get("http://127.0.0.1:8888/banner");
  };
  componentWillMount() {}
  componentDidMount() {
    this.getBannerList().then(res => {
      const List = [];
      res.data.data.map(item => {
        List.push({
          image: item.localaddress,
          title: item.name
        });
      });
      this.setState({
        bannerList: List
      });
    });
  }
  render() {
    return (
      <div className="Swiper">
        <ReactSwiper
          className="swiperbox"
          swiperOptions={this.state.swiperOptions}
          showPagination
          items={this.state.bannerList}
        />{" "}
      </div>
    );
  }
}

export default SwiperBox;
