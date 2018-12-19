import React, { Component } from "react";
import { Swiper, Flex, FlexItem } from "react-weui";
import "weui";
import "react-weui/build/packages/react-weui.css";
import "./index.css";
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  render() {
    return (
      <div className="Swiper">
        <Swiper
          height={150}
          onChange={(prev, next) => this.setState({ index: next })}
        >
          <img src="" role="presentation" />
        </Swiper>
      </div>
    );
  }
}

export default Main;
