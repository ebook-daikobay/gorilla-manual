# 音声と同時に再生させる方法

H2MDリソースには音声データは含まれていません。なので、音声と同時に再生させたい場合はmp3など音声データが必要です。またプレイヤーと再生秒数をシンクさせるため[2つのプレイヤーの再生秒数をシンクさせる方法](sync_play.md)のようなコードも必要です。

注意すべきは再生をするメインプレイヤーは音声だということです。`<audio>`をメインプレイヤーとして再生を進めて、再生秒数に合わせてプレイヤーを更新する流れになります。こうしないと音ズレが起きてしまうからです。

```html
<audio src="音声リソース" id="audio"></audio> 
<canvas id="player" width=640 height=360>This browser don't support canvas tag. </canvas>
```

```js
// audioを取得
var audio = document.querySelector('audioのid');
var instance = new H2MD();
instance.canvas('canvasのid');
instance.open('h2mdリソース', function () {
  // プレイヤーの再生はしない
  instance.decode(0);
  var fps = instance.info().fps;
  var timer;
  // 音声の再生を検知してプレイヤーのフレームを更新する
  audio.addEventListener('play', function () {
    // プレイヤーを更新するためのタイマーを回す
    timer = setInterval(function () {
      // 音声の再生時間を取得
      var currentTime = audio.currentTime;
      // fpsと掛け合わせて動画のフレームを算出
      var frame = Math.ceil(currentTime * fps);
      // プレイヤーを更新
      instance.decode(frame);
    }, 1000 / fps);
  }, false);
  audio.addEventListener('pause', function () {
    clearInterval(timer);
  }, false);
  // 音声の再生を開始
  audio.play();
});
```

<iframe src="./demo_audio_play.html" style="height:300px;"></iframe>
