const player = {
  str : `
* {
  margin: 0;
  padding: 0;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

#pikachu {
  background: #FFE600;
  height: 50vh;
  width: 100vw;
  position: relative;
}

.nose {
  width: 16px;
  height: 16px;
  border: 16px solid red;
  border-color: black transparent transparent transparent;
  position: absolute;
  left: 50%;
  top: 100px;
  border-radius: 20px;
  margin-left: -16px;
}

@keyframes wave{
  0%{
    transform: rotate(0deg);    
  }
  33%{
    transform: rotate(5deg);    
  }
  66%{
    transform: rotate(-5deg);    
  }
  100%{
    transform: rotate(0deg);    
  }

}
.nose:hover{
  
  animation: wave 200ms infinite linear;
}

@keyframes eyeMove{
  0%,to {
    top: 2px;
    left: 2px
}

30%,60%,70% {
    top: 0;
    left: 20px
}

40% {
    top: 0;
    left: 20px
}

50% {
    top: 0;
    left: 10px
}

80%,90% {
    top: 27px;
    left: 20px
}
}

.eye {
  height: 66px;
  width: 66px;
  border: 3px solid black;
  position: absolute;
  left: 50%;
  margin-left: -33px;
  border-radius: 50%;
  background: #2e2e2e;
  top: 60px;
}

.eye.left {
  transform: translateX(-100px);
}

.eye.right {
  transform: translateX(100px)
}

.eye:before {
  content: "";
  width: 30px;
  height: 30px;
  border: 1px solid black;
  position: absolute;
  left: 10px;
  background: white;
  border-radius: 50%;
  animation: eyeMove 3s infinite;
}

.mouth {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 50%;
  overflow: hidden;
  margin-left: -75px;
  top: 130px;
}


.mouth:after,
.mouth:before {
  content: "";
  width: 75px;
  height: 38px;
  background: #FFE600;
  border-bottom: 4px solid #000;
  position: absolute;
  z-index: 3;
  top: -14px;
}

.mouth:after {
  border-left: 3px solid #000;
  border-bottom-left-radius: 340px 180px;
  left: -2px;
  transform: rotate(-30deg);
}

.mouth:before {
  border-right: 3px solid #000;
  border-bottom-right-radius: 340px 180px;
  right: -2px;
  transform: rotate(30deg);
}

.mouth .mouth_main {
  width: 140px;
  height: 1000px;
  background: rgb(155, 0, 10);
  border: 3px solid #000;
  border-radius: 75px / 300px;
  margin-left: -70px;
  position: absolute;
  left: 50%;
  bottom: 0;
  overflow: hidden;
}


.mouth .mouth_main .shetou {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  background: rgb(255, 72, 95);
  position: absolute;
  bottom: -90px;
  left: 50%;
  margin-left: -100px;
  border-radius: 100px;
}

.face {
  width: 80px;
  height: 80px;
  background: rgb(255, 0, 0);
  border-radius: 50%;
  border: 3px solid black;
  position: absolute;
  left: 50%;
  margin-left: -40px;
  top: 170px;
}

.face.left {
  transform: translate(-150px);
}

.face.right {
  transform: translate(150px);
}
`,
  str2 : "",
  id : undefined,
  time : 70,
  n : 0,
  ui: {
    html : document.querySelector('#html'),
    style : document.querySelector('#style')
  },
  events : { // 声明时不能调用player，所以值写为字符串
    "#btnPause" : 'pause',
    "#btnPlay" : 'play',
    "#btnSlow" : 'slow',
    "#btnMedium" : 'medium',
    "#btnFast" : 'Fast',
    "#btnReplay" : 'Replay',
  },
  init: () => { // 初始化
    player.bindEvents()
    player.play()
  },
  bindEvents : () => { // 绑定点击事件
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key] // value = 'pause' / 'play' ...
        document.querySelector(key).onclick = player[value] // 将字符串值作为player的key，取到对应的函数
      }
    }
  },
  play : () => { // 播放
    player.id = setTimeout(player.run, player.time)
  },
  pause : () => { // 暂停
    return window.clearTimeout(player.id)
  },
  slow : () => { // 慢速
    player.pause(),
    player.time = 140,
    player.play()
  },
  medium : () => { // 中速
    player.pause(),
    player.time = 70,
    player.play()
  },
  Fast : () => { // 快速
    player.pause(),
    player.time = 0,
    player.play()
  },
  Replay : () => { // 重播
    location.reload() // 刷新页面
  },
  run : () => { // 插入setTimeout里的函数
    if (player.str[player.n] === "\n") {
      // 如果是回车，就加<br>,不照搬
      player.str2 += "<br>";
    } else if (player.str[player.n] === " ") {
      player.str2 += "&nbsp";
    } else {
      // 如果不是回车就照搬
      player.str2 += player.str[player.n];
    }

    player.ui.html.innerHTML = player.str2;
    player.ui.style.innerHTML = player.str.substring(0, player.n);
    window.scrollTo(0, 99999);
    html.scrollTo(0, 99999);
    if (player.n < player.str.length - 1) {
      player.n += 1; 
      player.play();
    }
  }

}
player.init()







