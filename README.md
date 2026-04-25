# 家じまいガイド

Vercel で公開する前提の Next.js サイトです。ローカル側ではこのディレクトリを正本として扱います。

## 目的

- `相続した実家`
- `空き家`
- `実家じまい`

の売却判断を、地域別に整理する高単価SEOサイトとして育てます。

## 現在の実装

- Vercel / Next.js 前提の土台
- 全国トップと地域ハブ
- 47都道府県ページ
- 関東・関西を中心にした市区町村ページ
- 都道府県ごとの悩み別導線
- 基幹ガイド記事
- `robots.txt` / `sitemap.xml`

## ローカル保存と同期

- 作業中の正本: `/Users/hf/Projects/iejimai-compass`
- 移植用ミラー: `/Users/hf/Projects/auto-revenue/site-projects/iejimaiguide`
- 時点スナップショット: `/Users/hf/Projects/auto-revenue/site-snapshots/iejimaiguide`
- 同期スクリプト: `/Users/hf/Projects/auto-revenue/scripts/sync_iejimaiguide_project.sh`

更新後はこの同期スクリプトを実行して、ミラーと圧縮スナップショットを残します。

## 次にやること

1. 市区町村データをさらに拡張する
2. CTA先のASP / 直提携構成を確定する
3. 地域別のデータレイヤーを厚くする
4. OGP画像と分析タグを追加する
5. 独自ドメイン接続後に canonical を本番値へ完全同期する

## ローカル起動

```bash
npm install
npm run dev
```

## Vercel

- framework: `nextjs`
- `vercel.json` は最小構成
- 独自ドメイン接続後に canonical / sitemap のURLを本番値へ合わせる
