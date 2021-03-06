### はじめに

当ZIPファイルは、以下のようなファイル構成・ディレクトリ構造になっております。

```
h2mdjs/
| 1.0.6.0/
| | h2md.webgl.min.js
| 1.0.6.0_rlpatched/
| | h2md.min.js
| README.txt
```

### WebGLによるアクセラレーション機能を有効にする場合

h2md.min.jsを読み込む前に、h2md.webgl.min.jsを読み込ませることで、WebGLによるアクセラレーションが有効になります。

また、WebGL のテクスチャの読み込みは、クロスドメインアクセス制御に従います。
コンテンツで他のドメインからテクスチャを読み込むためには、CORS で許可を得なければなりません。

```
<script type="text/javascript" src="../library/1.0.6.0/h2md.webgl.min.js"></script>
<script type="text/javascript" src="../library/1.0.6.0_rlpatched/h2md.min.js"></script>
```
