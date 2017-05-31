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
