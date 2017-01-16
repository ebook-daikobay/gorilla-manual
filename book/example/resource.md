# リソース指定の方法

H2MDのエンコード結果はディレクトリとして以下のような構成になります。

```
  sample /
    - movie.h2md.i00000000.jpg
    - movie.h2md.i00000001.jpg
    - movie.h2md.i00000002.jpg
    ...
    - movie.h2md.s00000000.b64
```

> `.jpg`は`.png`に、`.b64`は`.js`になっている場合があります

この時プレイヤーのインスタンスに渡す際のパスは`sample/movie.h2md`になります。つまり`i00000000.jpg`を取り除いたパスを1つのH2MD動画のリソースとして扱います。なので

```js
// openにH2MDリソースを渡す
new H2MD().open('sample/movie.h2md', function () {
  console.log('open');
});
```

となります。
