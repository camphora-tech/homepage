# Technology Stack

## Architecture

Nuxt 4 によるコンテンツ駆動の静的寄りWebサイト。ページ本文は `content/` の Markdown / YAML を Nuxt Content v3 の collection としてクエリし、Nuxt UI のページ系コンポーネントで描画する。`nitro.prerender.crawlLinks` で全ページをプリレンダリングし、`pnpm generate` の静的出力を Cloudflare Pages へデプロイする。サーバーAPIや独自のデータベースは持たない。

元は Nuxt UI Pro の SaaS テンプレートから派生しており、テンプレート由来の命名・不要機能が一部残っている（後述）。

## Core Technologies

- **Language**: TypeScript（Vue SFC は `<script setup lang="ts">`）
- **Framework**: Nuxt 4（`app/` ディレクトリ構成、`compatibilityDate` 指定）
- **UI**: Nuxt UI v4（Tailwind CSS v4 ベース）
- **Runtime**: Node.js 22 / pnpm 10（`packageManager` で固定）

## Key Libraries

- **@nuxt/content v3**: `content.config.ts` で collection と Zod スキーマを定義。取得は `queryCollection()` / `queryCollectionItemSurroundings()` を使う
- **@nuxt/image**: 画像は `<NuxtImg>` を使用（素の `<img>` は避ける）。外部ドメインは `nuxt.config.ts` の `image.domains` に追加。`provider: 'none'` で IPX/sharp による変換は行わず元画像をそのまま配信する（CI・Cloudflare 上で sharp が動かないため）。サイズ調整が必要な画像は事前に最適化して置く
- **nuxt-og-image**: `defineOgImageComponent('CamphoraTech', {...})` でブランドOG画像を生成。記事に画像があれば `defineOgImage({ url })` を優先。日本語描画用フォントは `ogImage.fonts` で指定する
- **@vueuse/nuxt**: コンポーザブルユーティリティ
- **Iconify**（lucide / simple-icons / material-symbols）: `i-lucide-*` 形式のクラス名で指定

## Development Standards

### Type Safety
- `nuxt typecheck`（vue-tsc）を CI で実行。コンテンツのフロントマターは `content.config.ts` の Zod スキーマが型の唯一の情報源
- 新しいフロントマター項目を使う場合は必ずスキーマ側に追加する

### Code Quality
- `@nuxt/eslint` の stylistic ルール: **末尾カンマなし**（`commaDangle: 'never'`）、`1tbs` ブレース、シングルクォート、セミコロンなし
- CI（GitHub Actions, push 時）で `pnpm lint` と `pnpm typecheck` を実行

### Deployment
- GitHub Actions から wrangler（`cloudflare/wrangler-action`）で Cloudflare Pages に直接デプロイする（NuxtHub は使わない）
- ブランチ対応: `main` → 本番（www.camphora.tech）、`preview` → プレビュー環境
- 絶対URL（og:image など）は `nuxt.config.ts` の `site.url` から組み立てる。本番は既定値、プレビューのビルドでは環境変数 `NUXT_SITE_URL` で上書きする
- 認証情報は GitHub Secrets で管理し、コードやドキュメントに書かない。デプロイには `CLOUDFLARE_API_TOKEN`（Cloudflare Pages の編集権限を持つ API トークン）が必要
- CI（`ci.yml`）とデプロイ（`deploy.yml`）は別ワークフロー。デプロイは `pnpm generate` が通った後に行う

### Testing
- 自動テストは未導入。検証は lint / typecheck と `pnpm dev`・`pnpm generate` での目視確認

## Development Environment

### Required Tools
- Node.js 22, pnpm 10.x

### Common Commands
```bash
# Dev:       pnpm dev
# Build:     pnpm build   (静的出力: pnpm generate)
# Lint:      pnpm lint
# Typecheck: pnpm typecheck
```

## Key Technical Decisions

- **コンテンツとコードの分離**: 文言・実績・プロジェクト情報はすべて `content/` に置き、ページコンポーネントは表示ロジックのみに留める
- **プリレンダリング前提**: 動的サーバー処理に依存しない。新規ページもクロール可能なリンクで到達できるようにする
- **SEOは各ページで明示**: すべてのページで `useSeoMeta`（title / ogTitle / description / ogDescription）と OG画像定義を行う。タイトルは `app.vue` の `titleTemplate: '%s - CamphoraTech'` で統一（トップのみ解除）
- **デザインシステム（大楠）**: 正本は Claude Design System「CamphoraTech」（https://claude.ai/artifact/B6p935Eue1VEM9xSqKbaB2）。コード側は `app/assets/css/main.css` がトークンの写しで、意味トークン（`--ct-*` → Tailwind の `bg-surface` / `text-ink` / `text-leaf` / `text-ring-strong` / `bg-sprout` など）とカラースケール（primary=`kusu`、secondary=`sprout`、neutral=`jushi`）を定義する。生の16進数や Tailwind 既定色（`gray-*` 等）は使わず意味トークンを使う。ライト（樟脳）とダーク（夜の樟葉）の両方を必ず確認する
- **書体**: 見出しは Shippori Mincho B1（`font-display`、日付は `numeral`）、本文は BIZ UDPGothic。@nuxt/fonts が Google Fonts から取得する
- **強調色の制限**: `sprout`（新芽の赤）は問い合わせ導線と最新の年輪だけに使う。グラデーション・ブラー・星空背景は使わない
- **Nuxt Studio 連携**: `content.preview.api` を有効化しており、スキーマの `.editor()` 指定は Studio 上の入力UIに反映される

---
_Document standards and patterns, not every dependency_

_updated_at: 2026-10-27 — デプロイ先を NuxtHub から Cloudflare Pages（wrangler）に変更、画像配信方式・site URL 設定・デプロイに必要な Secret を追記_
