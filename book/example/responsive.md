# 端末によってサイズを変更する

いわゆるレスポンシブサイトによる実装サンプルです。
端末の横幅によってプレイヤーのサイズや使うべきH2MDリソースは異なります。
特にPCとスマートフォンへレスポンシブサイトを提供するときはFPSなど変更したほうがいいでしょう。

```html
<canvas id="player">
  This browser don't support canvas tag.
</canvas>
```

```js
// 使い分けるリソース
var resource = {
  pc: {
    url: 'pc用のH2MDリソースのURL',
    // 表示サイズ
    width: 640,
    height: 360,
    // ビデオのサイズ
    videoWidth: 640,
    videoHeight: 360
  },
  smartphone: {
    url: 'smartphone用のH2MDリソースのURL',
    // 表示サイズ
    width: 320,
    height: 180,
    // ビデオのサイズ
    videoWidth: 640,
    videoHeight: 360
  },
  current: undefined
};
// レスポンシブにプレイヤーのサイズを切り替えるためcanvas要素を取得しておく
var canvas = document.getElementById('player');

// リソースを切り替える場合、インスタンスは使いまわさず新しいものにするため
// 関数化しておく
function newH2MD(id) {
  var instance = new H2MD();
  instance.jsonp(true);
  instance.canvas(id);
  instance.loop(true);
  return instance;
}

// 画面サイズの変更があったら動かすリスナー
function onresize() {
  // 画面幅
  var innerWidth = window.innerWidth;

  // 画面幅によって使うリソースを選択
  if (innerWidth < 700) {
    reopen(resource.smartphone);
  }
  // for pc
  else {
    reopen(resource.pc);
  }
}

// リソースの更新
function reopen(prop) {
  if (resource.current === prop.url) {
    return;
  }
  resource.current = prop.url;
  // 古いインスタンスを停止
  if (instance) {
    instance.pause();
  }
  // 使うリソースを更新する場合、インスタンスは新しいものに切り替える
  instance = newH2MD('player');
  // 新しいリソースをオープンし、表示サイズを整える 
  instance.open(prop.url, function () {
    canvas.width = prop.videoWidth;
    canvas.height = prop.videoHeight;
    canvas.style.width = prop.width + 'px';
    canvas.style.height = prop.height + 'px';
    // 再生
    instance.play();
  });
}

// 画面サイズの変更を監視
window.addEventListener('resize', onresize, false);
onresize();
```

<iframe src="./demo_responsive.html"></iframe>
