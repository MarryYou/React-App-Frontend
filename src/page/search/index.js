import React, { Component } from "react";
import "antd-mobile/dist/antd-mobile.css";
import { SearchBar, SegmentedControl, List, Button, Toast } from "antd-mobile";
import axios from "axios";
import RankCard from "../../components/rankcard";
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

const SegmentOrder = ["totalrank", "click", "pubdate", "dm"];
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectIndex: 0,
      show_suggest_word: false,
      suggest_list: [],
      video_list: [],
      page: 1,
      order: "totalrank",
      showhistory: true
    };
  }
  clearhistory = () => {
    localStorage.removeItem("search_history");
    this.setState({ showhistory: false });
  };
  suggest_click = tag => {
    Toast.loading(
      "正在加载中...",
      0,
      () => {
        // console.log("Load ....");
      },
      true
    );
    axios
      .get(
        domain +
          "/searchengine?keyword=" +
          tag.value +
          "&page=" +
          1 +
          "&order=" +
          this.state.order
      )
      .then(res => {
        let data = [];
        let history = JSON.parse(localStorage.getItem("search_history")) || {
          values: []
        };
        if (history.values.length >= 6) {
          history.values.shift();
        }
        if (history.values.indexOf(tag.value) == -1) {
          history.values.push(tag.value);
        }
        localStorage.setItem("search_history", JSON.stringify(history));
        this.setState({ showhistory: true });
        this.setState({ showhistory: true });
        try {
          data = res.data.data.result.video;
        } catch (error) {
          data = [];
        }
        this.setState({ video_list: data });
        this.setState({ suggest_list: [] });
        this.setState({ value: tag.value });
        Toast.hide();
      });
  };
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
      this.setState({ video_list: [] });
    } else {
      this.setState({ suggest_list: [] });
      this.setState({ value: "" });
      this.suggest_words(val);
      cacheTime.setCache(null, 0);
    }
  };
  onSubmit = val => {
    if (this.state.value.length > 0) {
      Toast.loading(
        "正在加载中...",
        0,
        () => {
          // console.log("Load ....");
        },
        true
      );
      axios
        .get(
          domain +
            "/searchengine?keyword=" +
            val +
            "&page=" +
            this.state.page +
            "&order=" +
            this.state.order
        )
        .then(res => {
          let data = [];
          let history = JSON.parse(localStorage.getItem("search_history")) || {
            values: []
          };
          if (history.values.length >= 6) {
            history.values.shift();
          }
          if (history.values.indexOf(val) == -1) {
            history.values.push(val);
          }
          localStorage.setItem("search_history", JSON.stringify(history));
          this.setState({ showhistory: true });
          try {
            data = res.data.data.result.video;
          } catch (error) {
            data = [];
          }
          this.setState({ video_list: data });
          this.setState({ suggest_list: [] });
          Toast.hide();
        });
    }
  };
  suggest_words = val => {
    axios.get(domain + "/suggest_words?term=" + val).then(res => {
      let data = [];
      try {
        data = res.data.result.tag;
      } catch (error) {
        data = [];
      }
      this.setState({ suggest_list: data });
    });
  };
  // onSegmentChange = e => {
  //   let Index = e.nativeEvent.selectedSegmentIndex;
  //   this.setState({ order: SegmentOrder[Index], page: 1, selectIndex: Index });
  //   this.setState({ video_list: [] });
  //   Toast.loading(
  //     "正在加载中...",
  //     0,
  //     () => {
  //       // console.log("Load ....");
  //     },
  //     true
  //   );
  //   axios
  //     .get(
  //       domain +
  //         "/searchengine?keyword=" +
  //         this.state.value +
  //         "&page=" +
  //         1 +
  //         "&order=" +
  //         SegmentOrder[Index]
  //     )
  //     .then(res => {
  //       let data = [];
  //       try {
  //         data = res.data.data.result.video;
  //       } catch (error) {
  //         data = [];
  //       }
  //       this.setState({ video_list: data });
  //       this.setState({ suggest_list: [] });
  //       Toast.hide();
  //     });
  // };
  newsLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
    axios
      .get(
        domain +
          "/searchengine?keyword=" +
          this.state.value +
          "&page=" +
          (this.state.page + 1) +
          "&order=" +
          this.state.order
      )
      .then(res => {
        let data = [];
        try {
          data = res.data.data.result.video;
        } catch (error) {
          data = [];
        }
        this.setState({ video_list: [...this.state.video_list, ...data] });
        this.setState({ suggest_list: [] });
      });
  };
  componentDidMount() {}
  render() {
    return (
      <div className="Search">
        <div className="Search_input">
          <SearchBar
            placeholder="Search"
            ref={node => (this.search = node)}
            onChange={this.onChange}
            value={this.state.value}
            maxLength={18}
            onSubmit={value => this.onSubmit(value)}
          />
        </div>
        <div className="Content">
          {typeof this.state.suggest_list == "object" && (
            <div className="suggest_list" ref={node => (this.suggest = node)}>
              <List className="my-list">
                {this.state.suggest_list.map((tag, idx) => {
                  return (
                    <Item key={idx} onClick={() => this.suggest_click(tag)}>
                      <div
                        className="suggest_word"
                        value={tag.value}
                        dangerouslySetInnerHTML={{ __html: tag.name }}
                      />
                    </Item>
                  );
                })}
              </List>
            </div>
          )}
          {/* {this.state.value.length > 0 && (
            <SegmentedControl
              className="segment-update"
              selectedIndex={this.state.selectIndex}
              values={["默认排序", "播放多", "新发布", "弹幕多"]}
              onChange={e => this.onSegmentChange(e)}
            />
          )} */}
          {this.state.value.length == 0 &&
            localStorage.getItem("search_history") && (
              <div className="history-card">
                <List className="history-list" renderHeader={() => "历史搜索"}>
                  {this.state.showhistory == true &&
                    JSON.parse(
                      localStorage.getItem("search_history")
                    ).values.map((tag, idx) => {
                      return (
                        <Item
                          key={idx}
                          onClick={() => this.suggest_click({ value: tag })}
                        >
                          <div>
                            <img
                              className="history-time"
                              src={domain + "/static/image/icon/history.png"}
                              alt=""
                            />
                            {tag}
                          </div>
                        </Item>
                      );
                    })}
                </List>
                <Button
                  className="clear-history"
                  onClick={() => this.clearhistory()}
                >
                  清除历史记录
                </Button>
              </div>
            )}
          {this.state.value.length > 0 && (
            <div className="card-container">
              {this.state.video_list.map((item, idx) => {
                let path = "/video?avId=" + item.aid;
                return (
                  <RankCard
                    key={idx}
                    rankIndex={idx}
                    rankImg={item.localaddress}
                    path={path}
                    rankTitle={{ title: item.title }}
                    rankSort={false}
                    upName={item.author}
                    videoNumber={item.play}
                    danmuNumber={item.video_review}
                  />
                );
              })}
              {this.state.video_list.length >= 20 && (
                <Button
                  className="news-loadMore"
                  onClick={() => this.newsLoadMore()}
                >
                  点击加载更多
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Search;
