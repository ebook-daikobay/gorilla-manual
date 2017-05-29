# 数値を計測する

数値を計測したい場合は`timeupdate(callback)`を使います。

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
