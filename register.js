window.onload = function () {
  //预加载
  revolve();
  light();

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

  document.getElementById("regBtn").onclick = function () {
    var input_username = document.getElementById("username").value;
    var input_password = document.getElementById("password").value;
    // ajax提交用户名+密码到后台程序
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "registerRecv.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("username=" + input_username + "&password=" + md5(input_password));
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        // 后台响应成功则跳转到登录页面
        if (res == "register success") {
          alert("注册成功");
          window.location.href = "loginPage.html";
        } else {
          alert("注册失败");
        }
      }
    };
  };

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
