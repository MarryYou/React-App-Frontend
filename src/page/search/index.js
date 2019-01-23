import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import { SearchBar, SegmentedControl, List } from "antd-mobile";
import axios from "axios";
import "./index.css";
import { domain } from "../../config";
var cacheTime = (function(time) {
  var _cache = {};
  return {
    setCache: (time, length) => {
      _cache["time"] = time;
      _cache["len"] = length;
    },
    getCache: () => {
      return [_cache.time, _cache.len] || [null, 0];
    }
  };
})();
const Item = List.Item;
const Brief = Item.Brief;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectIndex: 0,
      show_suggest_word: false,
      suggest_list: []
    };
  }
  onChange = val => {
    if (val.trim().length > 0) {
      if (cacheTime.getCache()[0] == null) {
        this.setState({ value: val });
        cacheTime.setCache(Date.now(), val.length);
        this.suggest_words(val);
      } else {
        this.setState({ value: val });
        if (Date.now() - cacheTime.getCache()[0] > 200) {
          this.suggest_words(val);
          cacheTime.setCache(Date.now(), val.length);
        }
      }
    } else {
      this.setState({ suggest_list: [] });
      this.setState({ value: "" });
      this.suggest_words(val);
      cacheTime.setCache(null, 0);
    }
  };
  onSubmit = () => {
    if (this.state.value.length > 0) {
      axios.get("http://localhost:8086" + "/suggest_words?term=").then(res => {
        console.log(res);
      });
    }
  };
  suggest_words = val => {
    axios
      .get("http://localhost:8086" + "/suggest_words?term=" + val)
      .then(res => {
        let data = [];
        try {
          data = res.data.result.tag;
        } catch (error) {
          data = [];
        }
        this.setState({ suggest_list: data });
      });
  };
  onSegmentChange = e => {
    let Index = e.nativeEvent.selectedSegmentIndex;
    console.log(Index);
  };
  componentDidMount() {}
  render() {
    return (
      <div className="Search">
        <div className="Search_input">
          <SearchBar
            placeholder="Search"
            ref={node => (this.search = node)}
            maxLength={20}
            onChange={this.onChange}
            value={this.state.value}
            onSubmit={value => console.log(value, "onSubmit")}
          />
        </div>
        <div className="Content">
          {this.state.suggest_list.length > 0 && (
            <div className="suggest_list">
              <List className="my-list">
                {this.state.suggest_list.map((tag, idx) => {
                  return (
                    <Item key={idx}>
                      <div dangerouslySetInnerHTML={{ __html: tag.name }} />
                    </Item>
                  );
                })}
              </List>
            </div>
          )}
          <SegmentedControl
            className="segment-update"
            selectedIndex={this.state.selectIndex}
            values={["默认排序", "播放多", "新发布", "弹幕多"]}
            onChange={e => this.onSegmentChange(e)}
          />
          <div className="card-container">1</div>
        </div>
      </div>
    );
  }
}
export default Search;
