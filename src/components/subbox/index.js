import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import "./index.css";
import { Tabs } from "antd-mobile";
class SubBox extends Component {
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
    const { onTabChange, tabs } = this.props;
    return (
      <div className="SubBox">
        <Tabs
          tabBarTextStyle={{
            fontSize: "2.4vh",
            height: "5vh",
            paddingBottom: "1.5vh"
          }}
          tabs={tabs}
          destroyInactiveTab={true}
          tabBarActiveTextColor="#fb7299"
          tabBarUnderlineStyle={{
            borderColor: "#fff",
            borderWidth: ".22vw"
          }}
          onChange={(tab, index) => {
            onTabChange(tab, index);
          }}
          renderTabBar={props => {
            return (
              <Tabs.DefaultTabBar
                ref={node => {
                  this.tabs = node;
                }}
                {...props}
                page={3}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default SubBox;
