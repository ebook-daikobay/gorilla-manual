# 動画の読み込み完了をまって再生する方法

`open(url, callback)`はH2MDリソースのメタ情報の読み込みが終わった時点で`callback`を呼びます。H2MDリソースの読み込みの完了をまって再生を開始したい場合は`buffered(callback)`を使いましょう。`buffered`は全H2MDリソースの読み込みが完了したら呼ばれるコールバックを登録できます。

```js
var instance = new H2MD();
instance.canvas('cavasのid');

// H2MDリソースの読み込みが完了したら再生を開始
instance.buffered(function () {
  instance.play();
});

instance.open('h2mdリソース');
```

<iframe src="./demo_buffered_play.html"></iframe>
