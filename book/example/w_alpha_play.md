# 2つのアルファ動画を1つのプレイヤーで再生させる方法

複数のアルファH2MDリソースを1つのプレイヤーで組み立てるにはプレイヤーを重ねる必要があります。複数のプレイヤーを作り、cssで重ねることで1つのプレイヤーとしてみせます。`<canvas>`に`position:absolute`などを指定しましょう。

```html
<div style="width:320px;height:180px;">
  <canvas id="player_back" width=640 height=360 style="width:320px;height:180px;position:absolute;top:0;left:0;z-index:1;">
    This browser don't support canvas tag.
  </canvas>
  <canvas id="player_front" width=640 height=360 style="width:320px;height:180px;position:absolute;top:0;left:0;z-index:2;">
    This browser don't support canvas tag.
  </canvas>
</div>
```

```js
var instance_front = new H2MD();
var instance_back = new H2MD();
instance_front.canvas('player_front');
instance_back.canvas('player_back');

instance_back.timeupdate(function () {
  instance_front.decode(instance_back.position().current_frame);
});

instance_front.open('h2mdリソース', function () {
  instance_back.open('h2mdリソース', function () {
    // openに成功したら再生
    instance_back.play();
  });
});

```
