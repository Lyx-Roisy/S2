window.onload = function () {
  //预加载
  load();
  anload();
  revolve();
  light();
  loadtitleone();
  loadtitletwo();

  document.documentElement.style.setProperty(
    "--screen-height",
    window.innerHeight + "px"
  );

  document.onselectstart = function () {
    return false;
  };
  document.oncontextmenu = function () {
    return false;
  };
  document.ondragstart = function () {
    return false;
  };
  document.onselect = function () {
    return false;
  };

  //尝试让伪类在移动端生效，目前失败
  var input = document.getElementsByTagName("input")[0];

  //提交按钮触发
  submit.onclick = function () {
    if (status == 0) {
      //先读取本地存储原来的数据
      var local = getData();
      //把local数组进行更新数据，把最新的数据追加给local数组
      if (input.value.trim() != "") {
        local.push({
          title: input.value,
          done: false,
          usetime: 0,
          donedate: "",
        });
      }
      saveData(local);
      load();
      loadtitleone();
      input.value = "";
    }
  };

  //清除按钮触发
  var status = 0;
  var timelength = 0;
  var antimer;
  var timebox = document.getElementById("timebox");
  var abandon = document.getElementById("abandonbutton");
  clear.onclick = function () {
    if (status == 0) {
      window.localStorage.clear();
      timelength = 0;
      clearInterval(antimer);
      timebox.style.opacity = 0;
      abandon.style.opacity = 0;
      load();
      anload();
    }
  };

  //回车与按钮等效
  document.onkeydown = function (e) {
    if (!e) e = window;
    if (e.keyCode == 13) {
      var obtnLogin = document.getElementById("submit");
      obtnLogin.focus();
      // fun();
    }
  };

  //读取本地存储的todolist数据
  function getData() {
    loadtitleone();
    var data = localStorage.getItem("todolist");
    if (data) {
      return JSON.parse(data); //将本地存储数据从字符串格式转换为对象格式
    } else {
      return [];
    }
  }

  //读取本地存储的donelist数据
  function angetData() {
    loadtitletwo();
    var andata = localStorage.getItem("donelist");
    if (andata) {
      return JSON.parse(andata); //将本地存储数据从字符串格式转换为对象格式
    } else {
      return [];
    }
  }

  //保存本地存储的todolist数据
  function saveData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
    loadtitleone();
  }

  //保存本地存储的donelist数据
  function ansaveData(andata) {
    localStorage.setItem("donelist", JSON.stringify(andata));
  }

  // 渲染todos
  function load() {
    var data = getData();
    //遍历数据
    var todos = document.querySelector(".todos");
    var str = "";
    data.forEach((element) => {
      var name = "points";
      var sty = "&#xf0129";
      var yesornot = "&#xe658";
      if (element.done) {
        name = "points-over";
        sty = "&#xe66a";
        var yesornot = "&#xe605";
      }
      str +=
        "<li class= '" +
        name +
        "'>" +
        "<div class='iconfont' id='checkbox'>" +
        sty +
        "</div>" +
        "<p id='opcr'>" +
        element.title +
        "</p>" +
        "<ul class='duration'>" +
        "<div class='iconfont' id='alarm'>&#xebb1</div>" +
        "<li>1min</<li>" +
        "<li>25min</<li>" +
        "<li>45min</<li>" +
        "<li>60min</li>" +
        "</ul>" +
        // "<div class='iconfont' id='alarm'>&#xebb1</div>" +
        "<myspan class='iconfont'>" +
        yesornot +
        "</myspan>" +
        "</li>";
    });
    //返回值
    todos.innerHTML = str;
    del();
    choose();
    timing();
    loadtitleone();
  }

  //渲染dones
  function anload() {
    var andata = angetData();
    //遍历数据
    var dones = document.querySelector(".dones");
    var anstr = "";
    andata.forEach((element, index) => {
      anstr +=
        "<li class='anpoints' >" +
        "<div class='iconfont' id='doneicon'>&#xe605</div>" +
        "<p id='opcrtwo'>" +
        element.antitle +
        "</p>" +
        "<p id='opcrthree'>" +
        element.andate +
        "</p>" +
        "<p id='opcrfour'>" +
        element.usetime +
        "</p>" +
        "</li>";
    });
    //返回值
    dones.innerHTML = anstr;
    del();
  }

  //渲染todos标题
  function loadtitleone() {
    var titleone = document.querySelector("#titleone");
    var data = localStorage.getItem("todolist");
    //crazy……
    if (data == "[]") {
      titleone.style.opacity = "0";
      titleone.style.height = "0px";
    } else if (data) {
      titleone.style.opacity = "100";
      titleone.style.height = "fit-content";
    } else {
      titleone.style.opacity = "0";
      titleone.style.height = "0px";
    }
  }

  //渲染dones标题
  function loadtitletwo() {
    var titletwo = document.querySelector("#titletwo");
    var dones = document.querySelector(".dones");
    var andata = localStorage.getItem("donelist");
    if (andata) {
      titletwo.style.opacity = 100;
      titletwo.style.height = "fit-content";
      dones.style.marginBottom = "15px";
    } else {
      titletwo.style.opacity = 0;
      titletwo.style.height = "0px";
    }
  }

  // 删除或移除todos
  var nowindex;
  function del() {
    var dele = document.querySelectorAll("myspan");
    dele.forEach((element, index) => {
      var data = getData();
      var tarstr = data[index].title;
      var str = data[index].donedate;
      var orusetime = data[index].usetime;
      element.onclick = function () {
        if (status == 0) {
          // if (index == nowindex) {
          //   timelength = 0;
          //   clearInterval(antimer);
          //   timebox.style.opacity = 0;
          //   abandon.style.opacity = 0;
          // }
          if (data[index].done) {
            var anlocal = angetData();
            anlocal.push({
              antitle: tarstr,
              andate: str,
              usetime: orusetime + "min",
            });
            ansaveData(anlocal);
            anload();
          }
          data.splice(index, 1);
          saveData(data);
          load();
          loadtitleone();
        }
      };
    });
  }

  //完成todos
  function choose() {
    var cho = document.querySelectorAll("#checkbox");
    cho.forEach((element, index) => {
      element.onclick = function () {
        if (status == 0) {
          var data = getData();
          // console.log(data[index].done);
          if (data[index].done) {
            data[index].done = false;
          } else {
            data[index].done = true;
            var str = "";
            var nowdate = new Date();
            // var year = nowdate.getFullYear();
            var month = nowdate.getMonth() + 1;
            var date = nowdate.getDate();
            str += month + "·" + date;
            data[index].donedate = str;
          }
          saveData(data);
          load();
          loadtitleone();
        }
      };
    });
  }

  //定时
  function timing() {
    var photo = document.querySelector(".popup");
    var strip = document.querySelectorAll(".duration>li");
    var duration = document.querySelectorAll(".duration");
    var time = 0;
    var holdtime = 0;
    status = 0;
    duration.forEach((element, index) => {
      var data = getData();
      if (data[index].done === false) {
        element.onmouseover = function () {
          if (status == 0) {
            this.style.height = "200px";
            this.style.zIndex = "100";
          }
        };
      }
      element.onmouseout = function () {
        this.style.height = "27px";
        this.style.zIndex = "50";
      };
    });
    strip.forEach((element, index) => {
      if (status == 0) {
        element.onclick = function () {
          if (status == 0) {
            var data = getData();
            var anindex = Math.floor(index / 4);
            nowindex = anindex;
            status = 1;

            var points = document.querySelectorAll(".points");
            points[anindex].style.backgroundColor = "rgb(255, 179, 232)";

            if ((index + 1) % 4 == 1) {
              time = 1 * 1000 * 60;
            } else if ((index + 1) % 4 == 2) {
              time = 25 * 1000 * 60;
            } else if ((index + 1) % 4 == 3) {
              time = 45 * 1000 * 60;
            } else if ((index + 1) % 4 == 0) {
              time = 60 * 1000 * 60;
            }
            console.log(index);
            timelength = time;
            holdtime = time / 60000;
            // var timebox = document.getElementById("timebox");
            // var abandon = document.getElementById("abandonbutton");

            antimer = setInterval(function () {
              var str = "";
              timelength -= 1000;
              var minutes = Math.floor(timelength / 60000);
              var seconds = (timelength / 1000) % 60;
              var visminutes = datacomplete(minutes);
              var visseconds = datacomplete(seconds);
              str += visminutes + ":" + visseconds;
              timebox.innerHTML = str;
              timebox.style.opacity = 100;
              abandon.style.opacity = 100;

              if (timelength == 0) {
                clearInterval(antimer);
                timebox.style.opacity = 0;
                abandon.style.opacity = 0;
              }
            }, 1000);

            abandon.onclick = function () {
              if (status == 1) {
                status = 0;
                timelength = 0;
                clearInterval(antimer);
                timebox.style.opacity = 0;
                abandon.style.opacity = 0;
                points[anindex].style.backgroundColor = "#a7caec";
              }
            };

            var op = 0;
            setTimeout(function () {
              if (status == 1) {
                points[anindex].style.backgroundColor = "#a7caec";
                console.log(anindex);
                console.log(data[anindex].usetime);
                console.log(holdtime);
                var nowtime = data[anindex].usetime + holdtime;
                console.log(nowtime);
                data[anindex].usetime = nowtime;
                saveData(data);
                console.log(data[anindex].title);
                console.log(data[anindex].usetime);
                var contime = 0;
                var speed = 0.2;
                let timer = null;
                timer = setInterval(function () {
                  op += speed;
                  if (op > 1.2 || op < 0) {
                    speed = -speed;
                  }
                  photo.style.opacity = op;
                  contime += 100;
                  if (contime == 4500) {
                    clearInterval(timer);
                    timer = null;
                    photo.style.opacity = 0;
                  }
                }, 100);
                status = 0;
              }
            }, time);
          }
        };
      }
    });
  }

  function datacomplete(num) {
    let len = ("" + num).length;
    if (2 > len) {
      num = Array(2 - len + 1 || 0).join(0) + num;
    }
    return num;
  }

  //美化——蝴蝶动效
  function revolve() {
    var butterfly = document.querySelector("#fly");
    var x = 0;
    var y = -1;
    var speedx = 0.05;
    var speedy = 0.03;
    setInterval(function () {
      x += speedx;
      y += speedy;
      butterfly.style.transform = "translate(" + x + "vw," + y + "vw)";
      if (x >= 15 || x <= -60) {
        speedx = -speedx;
      }
      if (y >= 0 || y <= -10) {
        speedy = -speedy;
      }
    }, 20);
  }

  //美化——花朵亮度变化
  function light() {
    var left = document.querySelector("#left");
    var right = document.querySelector("#right");
    var bright = 110;
    var flage = null;
    var speed = 0.5;
    if (flage == null) {
      flage = setInterval(() => {
        bright += speed;
        left.style.filter = "brightness(" + bright + "%)";
        right.style.filter = "brightness(" + bright + "%)";
        if (bright >= 130 || bright <= 110) {
          speed = -speed;
        }
      }, 100);
    }
  }
};
