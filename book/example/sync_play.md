# 2つのプレイヤーの再生秒数をシンクさせる方法

複数のプレイヤーで再生秒数をシンクさせたい場合は`timeupdate(callback)`と`decode(frame)`を使います。1つのメインプレイヤーだけで再生をして他のサブプレイヤーはメインプレイヤーのフレームの更新を検知して自身のフレームを更新します。

```js
var player = {
  main: new H2MD(),
  sub: new H2MD()
};
player.main.canvas('canvasのid');
player.sub.canvas('別のcanvasのid');

// メインプレイヤーのフレームの更新を検知する
player.main.timeupdate(function () {
  // メインプレイヤーの現在のフレームを取得
  var currentFrame = player.main.position().current_frame;
  // シンクさせたい秒数で
  if (30 < currentFrame && currentFrame < 100) {
    // サブプレイヤーにフレームをセットする
    player.sub.decode(currentFrame);
  }
});

player.main.open('h2mdのリソース', function () {
  player.sub.open('h2mdのリソース', function () {
    // 全てのプレイヤーのopenが完了したら再生
    player.main.play();
    // サブプレイヤーは再生をせず0フレーム目をセットしておく
    player.sub.decode(0);
  });
});
```

<iframe src="./demo_sync_play.html" style="height:250px;"></iframe>

## 数値を計測する
`timeupdate(callback)`は数値を計測したい場合にも使用できます。

ここではGoogleが提供する[Google アナリティクス](https://developers.google.com/analytics/?hl=ja)を使って再生数（このサンプルでは1フレーム目が表示されることを1再生と定義します）を計測するサンプルを紹介します。

```js 
var player = new H2MD();
player.jsonp(true);
player.canvas('player');

player.timeupdate(function () { 
  // 1フレーム目を表示しているかどうか
  if (player.position().current_frame === 1) {
    // 1フレーム目を表示している時にanalytics.jsの計測用関数を呼ぶ 
    ga('send', 'event', 'Video', 'play'); 
    // Google アナリティクス及びanalytics.jsの詳細は公式ドキュメントを参照してください
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/events?hl=ja 
  } 
});

player.open('https://s.yimg.jp/bdv/yahoo/rl/img/smartvision/h2md/trimmed_2', function () {
  player.play();
});
```

