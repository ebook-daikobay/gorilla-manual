# ダウンロード

ここではエンコードしたH2MDのJavaScriptライブラリや仕様書のダウンロードができます。

## JavaScriptライブラリ

以下zipファイルよりライブラリを取得して、自社サーバへ設置のうえご利用下さい。

[ダウンロード](./h2mdjs.zip)

### CDN
<pre><code>{{ book.js.https }}
{{ book.webgljs.https }}</code></pre>

クロスドメイン問題が発生するため、および許可なく更新するため、自社サイト上からの上記URLを参照してH2MDを動作させる運用は非推奨としております。

## JavaScriptライブラリ仕様書

[JavaScriptライブラリ仕様書（外部リンク）](https://h2md.axell-embedded.com/supports/documents.html)

#### クロスドメインについて

クロスドメインポリシーから、h2md.min.jsと動画ファイルは同じドメインに存在する必要があります。
クロスドメインを超える必要がある場合は、以下API仕様に記載されている ”JSONP API” をご利用ください。

[API仕様（外部リンク)](https://h2md.axell-embedded.com/supports/documents.html#docu_link4_2)

#### h2md.webgl.min.jsについて 

h2md.webgl.min.jsを利用することによって、WebGLによるアクセラレーション機能を有効にできます。詳しくは、以下ドキュメントをご参照ください。

[WebGLによるアクセラレーション（Experimental）(外部リンク)](https://h2md.axell-embedded.com/supports/documents.html#docu_link4_6)

## ライブプレビューツール

ローカルのH2MDファイルをドラッグアンドドロップするだけで確認できるブラウザツールです。

[ライブプレビューツール](./preview.md)
