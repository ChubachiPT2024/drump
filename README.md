# drump

drump（ドランプ）は、インストール不要で気軽に遊べるパーティーゲームをコンセプトとした、ブラックジャックで遊べるアプリケーションです。


# 実行手順

このアプリケーションの実行手順は以下の通りです。

## 1. Node.js v20.x のインストール

公式サイトから、Node.js v20.x をインストールしてください。

- [Node.js — Download Node.js®](https://nodejs.org/en/download/)

## 2. 環境設定ファイルの作成と配置

環境設定ファイル `.env.local` を作成して、リポジトリのルート直下に配置してください。

**Mac**

```bash
echo "VITE_API_URL=http://localhost:3000/api" > .env.local
```

**Windows**

```PowerShell
Write-Output "VITE_API_URL=http://localhost:3000/api" | Set-Content -Path .env.local -Encoding utf8
```

## 3. パッケージのインストール

以下のコマンドを実行して、必要なパッケージをインストールしてください。

```
npm install --omit=dev
```

## 4. サーバの起動

以下のコマンドを実行して、サーバを起動してください。

```
npm run start
```

## 5. アプリケーションの実行

ブラウザから、以下の URL にアクセスしてください。

- http://localhost:3000
