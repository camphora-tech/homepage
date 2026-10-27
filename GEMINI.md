# GEMINI.md

## プロジェクト概要

このリポジトリは、[CamphoraTech](https://camphora.tech) の公式ホームページのソースコードです。
[Nuxt.js](https://nuxt.com/) と [Nuxt Content](https://content.nuxt.com/) を利用して構築されており、ブログ、ドキュメントなどを含みます。

## 技術スタック

- **フレームワーク**: [Nuxt.js](https://nuxt.com/) v4
- **UI フレームワーク**: [Nuxt UI Pro](https://ui.nuxt.com/pro)
- **コンテンツ管理**: [Nuxt Content](https://content.nuxt.com/) v2
- **パッケージマネージャー**: [pnpm](https://pnpm.io/)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **リンター**: [ESLint](https://eslint.org/)
- **OGイメージ生成**: [Nuxt OG Image](https://nuxt.com/modules/og-image)

## セットアップと実行

### 前提条件

- [Node.js](https://nodejs.org/) (v18以上を推奨)
- [pnpm](https://pnpm.io/)

### インストール

1.  リポジトリをクローンします。
2.  プロジェクトルートで以下のコマンドを実行し、依存関係をインストールします。

    ```bash
    pnpm install
    ```

### 開発サーバー

以下のコマンドで開発サーバーを起動します。

```bash
pnpm dev
```

サーバーは `http://localhost:3000` で起動します。

## 主要なコマンド

- `pnpm dev`: 開発サーバーを起動します。
- `pnpm build`: 本番用にアプリケーションをビルドします。
- `pnpm generate`: 静的なサイトを `dist/` ディレクトリに生成します。
- `pnpm lint`: ESLint を使ってコードの静的解析を実行します。
- `pnpm typecheck`: TypeScript の型チェックを実行します。

## ディレクトリ構成

- `app/`: Nuxtアプリケーションのコアロジック（コンポーネント、レイアウト、ページなど）が含まれます。
- `content/`: Nuxt Content で管理されるマークダウンファイルやYAMLファイルが格納されています。ブログ記事やドキュメントなどがここにあります。
- `public/`: `favicon.ico` などの静的アセットが格納されています。
- `nuxt.config.ts`: Nuxt の主要な設定ファイルです。
- `package.json`: プロジェクトの依存関係とスクリプトが定義されています。

## タスク

以下はホームページ改善に向けたタスクリストです。解決すると `- [x]` に変更します。

- [x] トップページの動画を削除する
- [x] Pricing メニューを削除，関連ページも削除する
- [x] Changelog メニューの New というバッチを削除する
- [x] Changelog メニューは Camphora にちなんで Growth Ring と変更する
- [x] Sign-in/up 機能は不要なので削除する
- [x] Docs メニューは削除する．関連ファイルも削除する
 

## マイルストン
