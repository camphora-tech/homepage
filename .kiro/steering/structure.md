# Project Structure

## Organization Philosophy

**コンテンツ駆動 × ファイルベースルーティング**。サイトのセクション（Projects / Blog / Growth Ring）ごとに、`content/` のコンテンツ群・`content.config.ts` の collection・`app/pages/` のルートが1対1で対応する。セクション追加はこの3点セットで行う。

## Directory Patterns

### Content（`content/`）
**Purpose**: サイトの文言・データの唯一の置き場所  
**Pattern**:
- セクションのメタ情報: `N.section.yml`（例: `1.projects.yml` — 一覧ページのタイトル・説明・ナビアイコン）
- 個別エントリ: `N.section/` 配下の Markdown
- 先頭の数字プレフィックスは並び順用で、URLからは除去される（`1.projects/1.CognitiBase.md` → `/projects/cognitibase`）

**エントリ命名**:
- Projects: `{表示順}.{kebab-case-slug}.md`（例: `1.cogrow-ryoiku.md`）。フロントマターの `category` で所属カテゴリを指定
- Growth Ring: `{YYYYMMDDHH}.{kebab-or-Title-slug}.md`（例: `2025090100.SIO-Acceleration-accepted.md`）— 日付プレフィックスで時系列ソート。新規は kebab-case（例: `2026042400.NEDO-NEP-kickoff.md` のような略語の大文字は可）
- Growth Ring の「最新」表示（年輪の `sprout`、一覧の強調）は日付から自動で決まる。`badge: "New"` だけは手動なので、エントリ追加時に前の最新記事から外して新しい記事へ移す

### Collection 定義（`content.config.ts`）
**Purpose**: 各コンテンツ群の source パスとフロントマタースキーマ（Zod）  
**Projects のカテゴリ**: 並び順・説明・外部リンクは `1.projects.yml` の `categories` に定義し、各エントリの `category` と名前で突き合わせる。未定義のカテゴリや未指定のエントリは一覧の最後（「その他」）に回る

**Pattern**: 共通部品は `createBaseSchema()` / `createLinkSchema()` / `createImageSchema()` などのファクトリで組み立てる。セクションの一覧メタ（`.yml`）と個別エントリ（`/**/*`）は別 collection にする

### Utils（`app/utils/`）
**Purpose**: 自動インポートされる表示用ヘルパー（例: `formatDate` → `2025.09.01`、`badgeLabel`）

### Pages（`app/pages/`）
**Purpose**: ルーティングと表示  
**Pattern**:
- `section.vue`（`<NuxtPage />` のみのラッパー）+ `section/index.vue`（一覧）+ `section/[slug].vue`（詳細）
- 詳細ページは `queryCollection(name).path(route.path).first()` で取得し、見つからなければ `createError({ statusCode: 404, fatal: true })`
- `useAsyncData` のキーには `route.path` を使う

### Components（`app/components/`）
**Purpose**: 再利用UI  
**Pattern**:
- `App*.vue`: レイアウト共通部品（`AppHeader`, `AppFooter`）
- ブランド部品（ルート直下、PascalCase）: `PageHeading`（各ページ冒頭）、`TimelineEntry`（日付付きの一覧行）、`ProjectEntry`、`GrowthRings`（Growth Ring ページ冒頭の年輪断面。`PageHeading` の `aside` スロットに置く）、`CategoryLink`（別事業サイトへの外部リンク。新しいタブで開く旨を `sr-only` で補う）。新しいページはまずこれらを組み合わせる
- `content/`: Markdown（MDC）から `::component-name` で呼び出すコンポーネント（例: `PictureAndText`, `Pictures`）。slot ベースで本文を受け取る
- `OgImage/OgImage{Name}.vue`: OG画像テンプレート。`defineOgImageComponent('{Name}')` で参照（ブランド用は `CamphoraTech`）

### Static Assets（`public/`）
**Purpose**: ロゴ・favicon・OG画像・記事画像  
**Pattern**: ロゴはライト/ダーク版をペアで用意。記事用画像は `public/images/{topic}/` にまとめ、フロントマターでは `/images/...` の絶対パスで参照

## Naming Conventions

- **Vue コンポーネント**: PascalCase（`AppHeader.vue`, `PictureAndText.vue`）
- **ページファイル**: kebab-case のディレクトリ（`growth-ring/`）+ 動的セグメント `[slug].vue`
- **Collection 名**: camelCase の英単語。セクション名と一致させるのが原則
- **ルートパス**: kebab-case（`/growth-ring`）

## Import Organization

Nuxt の自動インポートに依存し、明示 import は最小限にする。

```typescript
// コンポーザブル・Nuxt UI コンポーネント・queryCollection は自動インポート
const { data } = await useAsyncData(route.path, () => queryCollection('projects').all())

// 動的 <component :is> に渡す場合のみ明示 import
import { UCard } from '#components'
```

**Path Aliases**:
- `~/`: `app/` ディレクトリ（例: `~/assets/css/main.css`）
- `#components`, `#ui/types`: Nuxt / Nuxt UI の仮想モジュール

## Code Organization Principles

- ページは「取得 → SEO設定 → テンプレート」の順で `<script setup>` を構成する
- 表示用の文言はページにハードコードせず、可能な限りコンテンツ（`.yml`）から取得する
- ナビゲーション項目は `AppHeader.vue` に定義。セクション追加時はここと `app.vue` の検索リンクも更新する

## Known Template Legacy

SaaS テンプレート由来で、現状の命名と実態がずれている箇所。新規コードでは踏襲せず、触る際に整理する。

- Growth Ring の collection 名が `changelog`（一覧メタ）/ `versions`（エントリ）のまま
- `app/types/index.d.ts` の `BlogPost` が Nuxt Content v2 の `ParsedContent` 型に依存

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_

_updated_at: 2026-10-27 — Projects の命名・カテゴリ構成と `CategoryLink` を追記。Growth Ring の New バッジ運用を追記_
