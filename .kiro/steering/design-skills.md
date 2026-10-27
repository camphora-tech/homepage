# Design Skills Usage

UI・文言・アクセシビリティに関わる作業で、どのデザイン系スキルをいつ使い、その出力をどうプロジェクトの制約に合わせるかの指針。デザイントークンやブランド規則そのものは `tech.md` の「デザインシステム（大楠）」が正であり、本ファイルは**スキルの使い分けと優先順位**だけを扱う。

## 基本原則

- **デザインシステムがスキルより優先**: スキルの一般論（「独自性のある配色を」「アクセントを足す」等）が大楠の規則と衝突したら、大楠を採る。スキルは判断の補助であり、ブランドの再定義には使わない
- **正本は Claude Design System「CamphoraTech」**: 新しいパターンを作るときは先にデザインシステムを読み、コード（`app/assets/css/main.css`）はその写しとして追随させる。逆方向（コードで勝手に新色を作る）はしない
- **小さな変更でもスキルを省略しない**: 該当ドメイン（UI・文言・a11y）に触れるなら、変更規模に関係なく対応スキルを通す
- **既存部品の組み合わせを先に検討**: `PageHeading` / `TimelineEntry` / `ProjectEntry` / `GrowthRings` で表現できないときだけ新規コンポーネントを設計する

## スキルの使い分け

| 状況 | スキル | 主な用途 |
|---|---|---|
| 新しいページ・セクションの見た目を決める | `frontend-design` | レイアウト・タイポグラフィ・余白のリズムの方向付け |
| 新しいUIパターンを追加する／トークンの不整合を調べる | `design:design-system` | 既存トークン・部品との整合確認、ハードコード値の検出 |
| 実装済み画面のレビュー | `design:design-critique` | 階層・一貫性・ユーザビリティの指摘 |
| アクセシビリティ確認 | `design:accessibility-review` | WCAG 2.1 AA（コントラスト・キーボード・フォーカス・代替テキスト） |
| ボタン・リンク・空状態・エラーの文言 | `design:ux-copy` | マイクロコピーの作成・見直し |
| 仕様を実装タスクへ渡す | `design:design-handoff` | トークン・状態・レスポンシブ挙動の明文化（spec の design.md 作成時） |
| チャート・数値表示 | `dataviz` | 実績の可視化を加える場合のみ |

### 使わないもの

- **`small-business:brand-style`**: ブランドは Design System で管理しているため、別のブランド設定を作らない
- **`artifact-design`**: claude.ai の Artifact を作るとき専用。サイトのコードには適用しない
- **`design:user-research` / `design:research-synthesis`**: 利用者調査を実施する明確な依頼がある場合のみ

## Spec-Driven ワークフローとの対応

| フェーズ | 使うスキル | 目的 |
|---|---|---|
| Requirements | `design:ux-copy`（必要時） | 画面上の文言・問い合わせ導線の要件化 |
| Design（`/kiro-spec-design`） | `frontend-design` → `design:design-system` → `design:design-handoff` | 方向付け → 大楠との整合 → 実装可能な仕様化 |
| Implementation（`/kiro-impl`） | `design:design-system` | トークン利用の逸脱がないか確認 |
| Validation（`/kiro-validate-impl`） | `design:accessibility-review`, `design:design-critique` | 完了前の品質ゲート |

スキルの指摘は spec の `design.md` または `research.md` に要点だけ残し、スキル出力の全文は貼らない。

## スキル出力を採用する際のフィルタ

スキルの提案は、以下に照らしてから採用する。

### 色
- 意味トークン（`bg-surface` / `text-ink` / `text-ink-muted` / `text-leaf` / `text-ring-strong` / `border-hairline` など）だけを使う
- 生の16進数、Tailwind 既定色（`gray-*`, `blue-*` 等）、新しいカラースケールの追加は不可
- `sprout`（新芽の赤）は**問い合わせ導線と最新の年輪のみ**。スキルが「アクセントカラー」を提案しても他所には使わない

```vue
<!-- Good -->
<p class="text-ink-muted border-t border-hairline">...</p>

<!-- Bad: 既定色・生の値・sprout の流用 -->
<p class="text-gray-500 border-[#ccc]">...</p>
<UBadge color="secondary">New</UBadge>
```

### 装飾
- グラデーション・ブラー・グロー・星空背景は使わない（テンプレート由来の SaaS 的装飾を戻さない）
- 角丸は `--ui-radius`（ほぼ角）に従う。丸みを強める提案は採らない
- モチーフは「樟（くすのき）・年輪」。新しい装飾を足すなら、このメタファーに沿うかを基準にする

### タイポグラフィ
- 見出しは `font-display`（Shippori Mincho B1）、日付・数値は `numeral`、本文は既定（BIZ UDPGothic）
- 書体の追加・置換は提案されても採らない。変更が必要なら Design System 側で決める
- 日本語の改行（`word-break: auto-phrase`）とゆったりした行間（1.9）を前提に余白を設計する

### 文言（ux-copy）
- 本文は日本語の丁寧語（です・ます）。ナビ・セクション名（Projects / Blog / Growth Ring）は英語表記を維持
- 文言はページに直書きせず、`content/` の `.yml` / Markdown に置く
- 会社概要（代表者・所在地）や、支援プログラムの詳細・非公開プロジェクトの進捗は文言案に含めない

## 検証の必須項目

デザイン系の変更は、完了前に以下を確認する（`kiro-verify-completion` のエビデンスとして残す）。

- **ライト（樟脳）とダーク（夜の樟葉）の両方**で表示確認。片方だけのスクリーンショットでは完了扱いにしない
- **コントラスト**: 本文・`text-ink-muted`・リンク・`sprout` 上の文字が AA を満たす（`accessibility-review` で確認）
- **フォーカス**: `:focus-visible` のアウトライン（`--ct-leaf`）が消えていない
- **モバイル幅**: 横スクロールが出ない、タップ領域が十分
- `pnpm lint` と `pnpm typecheck` が通る

## Design System を更新する場合

スキルの検討の結果、新トークンや新パターンが本当に必要になったら:

1. 先に Claude Design System「CamphoraTech」に追加する（正本の更新）
2. `app/assets/css/main.css` に同名で写す（ライト／ダーク両方の値を定義）
3. 用途と制限を `tech.md` のデザインシステム項に追記する

コード側だけに存在するトークンを作らない。

---
_スキルは判断の補助。最終判断は Design System と steering の規則に従う_
