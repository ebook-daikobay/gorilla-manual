# gorilla-manual
エンコードツールのマニュアル

# Contributing

```
# 1. パッケージインストール
npm install
# 2. サーバの起動
npm start
# 3. book/*を編集
```

### npm scripts

```
Lifecycle scripts included in gorilla-manual:
  # サーバの起動
  # [book, gitbook.config.json]を監視し変更があればサーバを更新
  start
    gulp

available via `npm run-script`:
  # サーバの起動
  serve
    gulp webserver
  # book/**/*.mdからhtmlページをwebsite/**/*へ生成する
  build
    gulp build
  # （circleci用）gh-pagesブランチへデプロイ
  gh-pages
    gulp gh-pages
```

## gh-pages本番反映方法
```
1. $ git checkout master
2. book/*を編集
3. $ gulp gh-pages
      gh-pagesブランチにプッシュされる。
```
