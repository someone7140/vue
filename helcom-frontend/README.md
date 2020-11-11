# 環境構築など

## 前提

- Node.js を事前にインストールしてください。mac での導入方法は(Mac に Node.js をインストール)[https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09]を参考にしてください。
- API とつなぐときは backend の起動をしてください。詳細は backend 側の README を参照してください。
- API のつなぎ先は config 配下の`env.local.js`に設定しています。
- パスは`frontend`フォルダ配下に格納されることを前提とします。

## ローカル起動

- 初回起動およびライブラリの更新があった場合は、`frontend`フォルダ配下で`npm install`を実行してください。
- `npm run local`で起動します。

## 開発環境用ビルド

- `npm run staging`でビルド用ファイルを出力します。`nuxt-dist/dist/client`フォルダに出力されます。

## 本番環境用ビルド

- `npm run production`でビルド用ファイルを出力します。`nuxt-dist/dist/client`フォルダに出力されます。

## その他実装について

- ログイン前提のページは、vue ファイルに`middleware: "authCheck"`を設定してください。
