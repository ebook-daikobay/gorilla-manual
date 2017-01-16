# 動画のインビュー再生

## インビュー再生とは？

インビュー再生とは、動画プレイヤーが画面外にある時には動画を停止し、画面内に入った時（インビュー状態）に動画を再生することです。
Webページのファーストビューに動画プレイヤーが表示されていない場合でも、ユーザーに動画の初めから再生させることが出来ます。

## サンプル

[サンプル](inview_play_demo.html)

```html
<canvas id="player"></canvas>
<script type="text/javascript" src="https://s.yimg.jp/bdv/yahoo/rl/js/h2md/1.5.0/h2md.js"></script>
<script>
// プレイヤー要素
var playerElement = document.getElementById('player');

/**
 * isPlayerInView
 *
 * プレイヤー要素が画面内に表示されたか判定する関数
 *
 * @param {number} threshold プレイヤ要素の面積に対する表示領域の割合(0~1)が
 *                           この閾値を超えた場合に画面内に表示されたと見なす
 * @return {bool} プレイヤー要素が画面内に表示されていればtrueを、
 *                されていなければfalseを返す
 */
function isPlayerInView(threshold) {
  // 画面の幅と高さ
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  // プレイヤー要素のサイズと現在位置の取得
  var rect = playerElement.getBoundingClientRect();

  // 要素の面積
  var area = rect.width * rect.height;
  // 表示領域の幅
  var viewWidth = Math.min(windowWidth, rect.right) - Math.max(0, rect.left);
  // 表示領域の高さ
  var viewHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
  // 表示領域の面積
  var viewArea = viewWidth * viewHeight;
  // 要素の面積に対する表示領域の割合(0~1)
  var viewRate = viewArea / area;

  // 表示領域の割合が閾値以上か
  return viewRate >= threshold;
}

// h2mdインスタンスを生成
var player = new H2MD();
player.jsonp(true);
// ループ再生を有効にする
player.loop(true);
// <canvas id="player">を利用して再生
player.canvas('player');
// すべての素材の読み込みが完了したら関数を実行
player.buffered(function () {
  console.log('全ての素材の読み込みが完了');
  // 1フレーム目を表示
  player.decode(0);

  // プレイヤー要素が表示されたかのフラグ
  // 表示領域が50%以上の場合に true を返す
  var inViewFlag = isPlayerInView(0.5);
  // 既に表示されていれば再生を開始する
  if (inViewFlag) {
  player.play();
  }

  // scrollイベントでプレイヤー要素が表示状態を監視
  window.addEventListener('scroll', function () {
    // 表示領域が50%以上か
    var inViewNow = isPlayerInView(0.5);

    if (!inViewFlag && inViewNow) {
      console.log('プレイヤー要素が画面内に表示されたので、再生');
      inViewFlag = inViewNow;
      player.play();
    } else if (inViewFlag && !inViewNow) {
      console.log('プレイヤー要素が画面外に出たので、停止');
      inViewFlag = inViewNow;
      player.pause();
    }
  });
});

// 動画を開く
player.open('https://s.yimg.jp/bdv/yahoo/rl/img/smartvision/h2md/trimmed_2');
</script>
```

## 実装のポイント

上記サンプルでは、`isPlayerInView`関数でプレイヤー要素の全体の面積（`area`）における表示領域の面積（`viewArea`）の割合（`viewRate`、0から1の数値）を計算し、それが閾値（`threshold`）を超えていれば`true`を返します。

```js
/**
 * isPlayerInView
 *
 * プレイヤー要素が画面内に表示されたか判定する関数
 *
 * @param {number} threshold プレイヤ要素の面積に対する表示領域の割合(0~1)が
 *                           この閾値を超えた場合に画面内に表示されたと見なす
 * @return {bool} プレイヤー要素が画面内に表示されていればtrueを、
 *                されていなければfalseを返す
 */
function isPlayerInView(threshold) {
  // 画面の幅と高さ
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  // プレイヤー要素のサイズと現在位置の取得
  var rect = playerElement.getBoundingClientRect();

  // 要素の面積
  var area = rect.width * rect.height;
  // 表示領域の幅
  var viewWidth = Math.min(windowWidth, rect.right) - Math.max(0, rect.left);
  // 表示領域の高さ
  var viewHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
  // 表示領域の面積
  var viewArea = viewWidth * viewHeight;
  // 要素の面積に対する表示領域の割合(0~1)
  var viewRate = viewArea / area;

  // 表示領域の割合が閾値以上か
  return viewRate >= threshold;
}
```

下図は、`playerElement.getBoundingClientRect()`が返す値を視覚的に表現したものです。

![図1](/images/diagrams/diagrams.001.jpeg)

`scroll`イベント発生時に`isPlayerInView`関数を実行し、`true`を返した場合は、プレイヤーが画面内にあると判定し、動画を再生します。逆に`false`を返した場合は画面外にあると判定し、動画を停止しています。

```js
  // scrollイベントでプレイヤー要素が表示状態を監視
  window.addEventListener('scroll', function () {
    // 表示領域が50%以上か
    var inViewNow = isPlayerInView(0.5);

    if (!inViewFlag && inViewNow) {
      console.log('プレイヤー要素が画面内に表示されたので、再生');
      inViewFlag = inViewNow;
      player.play();
    } else if (inViewFlag && !inViewNow) {
      console.log('プレイヤー要素が画面外に出たので、停止');
      inViewFlag = inViewNow;
      player.pause();
    }
  });
```


