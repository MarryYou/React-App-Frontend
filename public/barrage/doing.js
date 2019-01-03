import { CanvasBarrage } from "./canvasBarrage.js";
// 弹幕数据
var dataBarrage = [
  {
    value: "speed设为0为非滚动",
    time: 1, // 单位秒
    speed: 0
  },
  {
    value: "time控制弹幕时间，单位秒",
    color: "blue",
    time: 2
  },
  {
    value: "视频共21秒",
    time: 3.2
  },
  {
    value: "视频背景为白色",
    time: 4.5
  },
  {
    value: "视频为录制",
    time: 5.0
  },
  {
    value: "视频内容简单",
    time: 6.3
  },
  {
    value: "是为了让视频尺寸不至于过大",
    time: 7.8
  },
  {
    value: "省流量",
    time: 8.5
  },
  {
    value: "支持弹幕暂停（视频暂停）",
    time: 9
  },
  {
    value: "add()方法新增弹幕",
    time: 11
  },
  {
    value: "reset()方法重置弹幕",
    time: 11
  },
  {
    value: "颜色，字号，透明度可全局设置",
    time: 13
  },
  {
    value: "具体交互细节可参考页面源代码",
    time: 14
  },
  {
    value: "内容不错哦！",
    time: 18,
    color: "yellow"
  }
];

// 初始化弹幕方法
var eleCanvas = document.getElementById("canvasBarrage");
var eleVideo = document.getElementById("videoBarrage");

var demoBarrage = new CanvasBarrage(eleCanvas, eleVideo, {
  data: dataBarrage
});

// 下面是交互处理，与弹幕方法本身无关，旨在演示如何修改全局设置，新增弹幕等
// 1. 全局的弹幕大小，位置和透明度处理
document.addEventListener(
  "DOMContentLoaded",
  function() {
    $(".range").on("change", function() {
      // 改变弹幕的透明度和字号大小
      demoBarrage[this.name] = this.value * 1;
    });

    $('input[name="range"]').on("click", function() {
      // 改变弹幕在视频显示的区域范围
      demoBarrage["range"] = this.value.split(",");
    });

    // 发送弹幕
    var elForm = $("#barrageForm"),
      elInput = $("#input");
    elForm.on("submit", function(event) {
      event.preventDefault();
      // 新增弹幕
      demoBarrage.add({
        value: $("#input").val(),
        color: $("#color").val(),
        time: eleVideo.currentTime
      });

      elInput.val("").trigger("input");
    });
    // 提交按钮
    var elSubmit = elForm.find('input[type="submit"]');

    // 输入框和禁用按钮
    elInput.on("input", function() {
      if (this.value.trim()) {
        elSubmit.removeAttr("disabled");
      } else {
        elSubmit.attr("disabled", "disabled");
      }
    });
  },
  false
);
