## コントローラーの実装 

H2MDプレイヤーには再生/停止ボタンなどのコントローラー部品は含まれておりません。
コントローラーを使用したい場合は、H2MDインスタンスのAPIを使って実装していただく必要があります。

以下はH2MDインスタンスのAPIを使用して、簡易的な再生/停止ボタンとプログレスバーを実装するサンプルです。

なお、本サンプルを参考していただくにあたり、実利用の際には以下ご注意ください。
* サンプル内の 再生/停止ボタン用スプライト画像 はそのまま引用せず、ご利用者様にて素材をご用意ください
* H2MDのJavaScriptライブラリは、自サーバーに配置したJavaScriptライブラリのパスに置き換えください

```css
#playerContainer { 
  position: absolute; 
  top: 0; 
  bottom: 0; 
  left: 0; 
  right: 0;
  width: 320px;
  height: 180px;
  margin: 0px auto;
} 
#player {
  display: block;
  width: 320px;
  height: 180px;
}
#controller {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 25px;
  background-color: rgba(0,0,0,0.5);
}
#toggleButton {
  display: block;
  /*
      再生/停止ボタン用スプライト画像を指定(各ボタンのサイズが27px)
      (こちらはサンプル用画像なので実際には使用しないでください)
  */
  background: transparent url(https://s.yimg.jp/bdv/yahoo/rl/img/common/playerUi.png) no-repeat -27px 50%;
  background-size: auto 27px;
  z-index: 10;
  width: 27px;
  height: 100%;
}
#progressBar {
  position: absolute;
  top: 50%; 
  z-index: 10;
  right: 10px;
  width: 280px;
}
#loadedBar {
  position: absolute;
  top: 50%;
  left: 0;
  background-color: #eee;
  z-index: 10;
  width: 100%;
  height: 3px;
  transform: translateY(-50%);
}
#advanceBar {
  position: absolute;
  top: 50%;
  left: 0;
  background-color: #2E9AFE;
  z-index: 20;
  width: 0px;
  height: 3px;
  transform: translateY(-50%);
}
```

```html
<div id="playerContainer">
  <canvas id="player" width=640 height=360>
      This browser not supported canvas.
  </canvas>
  <div id="controller">
    <a id="toggleButton"></a>
    <div id="progressBar">
      <div id="loadedBar"></div>
      <div id="advanceBar"></div>
    </div>
  </div>
</div>
```

```js
// 再生/停止ボタン
var toggleButton = document.getElementById('toggleButton');
// 再生/停止ボタン用スプライト画像(各ボタンのサイズが27px)
// (こちらはサンプル用画像なので実際には使用しないでください)
var toggleButtonImg = 'https://s.yimg.jp/bdv/yahoo/rl/img/common/playerUi.png';
// プログレスバー
var advanceBar = document.getElementById('advanceBar');

function switchToggleButton(isPlaying) {
  if (isPlaying) {
    // 再生中であれば停止ボタンに切り替える
    toggleButton.style.background = 'transparent url(' + toggleButtonImg + ') no-repeat -27px 50%';
  } else {
    // 停止中であれば再生ボタンに切り替える
    toggleButton.style.background = 'transparent url(' + toggleButtonImg + ') no-repeat 0px 50%';
  }
  toggleButton.style.backgroundSize = 'auto 27px';
}

var player = new H2MD();
player.jsonp(true);
player.canvas('player');

player.timeupdate(function () {
  // 現在のフレームを取得
  var currentFrame = player.position().current_frame;
  // timeupdate時に参照可能な最終フレーム(総フレーム数 - 1)を取得
  var lastFrame = player.info().frames - 1;
  // 現在のフレームと最終フレームからプログレスバーの幅を算出して指定(%)
  advanceBar.style.width = Math.floor(currentFrame / lastFrame * 100) + "%";

  // 最後まで再生されたら再生ボタンを切り替える
  if (currentFrame === lastFrame) {
    switchToggleButton(player.playing());
  }
});

player.open('https://s.yimg.jp/bdv/yahoo/rl/img/smartvision/h2md/trimmed_2', function () {
  // 再生/停止ボタンにクリックイベントを定義
  toggleButton.addEventListener('click', function () {
    if (player.playing()) {
      // 再生中であれば停止
      player.pause();
    } else {
      // 停止中であれば再開
      player.play();
    }
    // 再生/停止ボタン切り替え
    switchToggleButton(player.playing());
  });

  player.play();
});
```

<iframe src="./demo_controller.html" style="height:250px;"></iframe>
