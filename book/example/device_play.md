# デバイスによって使うH2MDリソースを分ける方法

H2MDリソースは圧縮率を指定してエンコードすることができます。[圧縮率が変わるとデコードにかかる負荷も変わってきます](../encode/block_size.md)。

一番低性能のマシンに照準を合わせてエンコードすれば全デバイスで問題なく再生が可能ですが、各デバイスによって最適なエンコードリソースを使用したい場合はリソースの振り分けが必要です。H2MDライブラリには振り分け機能はないので各自で書きましょう。

```js
var instance = new H2MD();
instance.canvas('cavasのid');

// Androidかどうかを判定
var userAgent = navigator.userAgent;
// ※この判定方法はあくまで例です
var isAndroid = /Android/.test(userAgent);
// iOSとAndroidで使うリソースを変える
var resource = isAndroid ? 'sample/android.h2md' : 'sample/ios.h2md';

instance.open(resource, function () {
  instance.play();
});
```
