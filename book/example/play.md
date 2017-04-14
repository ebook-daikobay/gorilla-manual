# H2MD動画を再生する方法

H2MD動画をブラウザ上で再生する方法について説明します。
大きく分けて、以下の2つの手順が必要です。

* `<canvas>`の用意
* H2MDインスタンスの作成

動画の再生は`<canvas>`を使いますが`<canvas>`は各自で用意してください。H2MDインスタンスには`<canvas>`の`id`属性か要素自体を渡します。

```html
<canvas id="player" width=640 height=360>
  This browser don't support canvas tag.
</canvas>
```

```js
// インスタンスの生成
var instance = new H2MD();
// canvas要素の指定
instance.canvas('cavasのid');
// もしくは instance.canvasElement(document.querySelector('#canvasのid'));
// H2MDリソースの読み込み
instance.open('h2mdリソース', function () {
  // openに成功したら再生
  instance.play();
});
```

また、jsonp形式でエンコードした場合には`open`の前に以下の設定が必要です。

```js
instance.jsonp(true);
```

また、ループ指定をする場合は`play`の前に以下の設定が必要です。

```js
instance.loop(true);
```
となります。

<iframe src="./demo_play.html"></iframe>

また、jsonp形式で同じ動画リソースを使用した複数動画再生をする場合、以下のサンプルのように、順番にH2MDリソースを読み込んでいただく必要があります。

```js 
instance1.open('h2mdリソース', function () {
  instance2.open('instance1で読み込んでいるものと同じh2mdリソース', function () { 
  });
});
```
同じリソースを使わない場合は、順番に読み込む必要はありません。

```js 
instance1.open('h2mdリソース', function () {
}); 
instance2.open('instance1で読み込んでいるものと別のh2mdリソース', function () { 
});
```

