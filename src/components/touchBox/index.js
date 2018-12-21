import React, { Component } from "react";
import "./index.css";
import Swipe from "react-easy-swipe";
class TouchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      positionX: 0
    };
  }
  render() {
    const { children, onSwipeStart, onSwipeMove, onSwipeEnd } = this.props;

    return (
      <Swipe
        className="Swipe"
        onSwipeStart={this.props.onSwipeStart}
        onSwipeMove={this.props.onSwipeMove}
        onSwipeEnd={this.props.onSwipeEnd}
      >
        {children}
      </Swipe>
    );
  }
}
export default TouchBox;
