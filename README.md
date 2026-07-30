# おさんぽクラブ東京

高円寺・吉祥寺・浅草の散歩コース、スポット、読み物を、所要時間・予算・確認状態とともに探せる地域メディアです。

正式公開先は `https://nobuja0428.github.io/osanpo-club-tokyo/` です。旧サイトのコード、設定、ルーティング、basePath、Actions、Git履歴は使用していません。

## 技術構成

- Next.js App Router
- TypeScript strict
- 静的エクスポート
- CSS
- Vitest
- Playwright
- axe
- Lighthouse CI
- GitHub Actions / GitHub Pages

## 開発

Node.js 22とnpmを使用します。

```bash
npm ci
npm run dev
```

## 検査

```bash
npm run lint
npm run typecheck
npm run validate:content
npm run test
npm run build
npm run test:e2e
npm run test:a11y
npm run test:links
npm run test:seo
npm run test:lighthouse
npm run test:all
```

`test:all`が成功した場合だけ、`deploy-pages.yml`のdeployジョブへ進みます。

## コンテンツ方針

- 公開情報で確認できる内容だけを掲載
- 現地取材は未実施と明示
- AI画像はすべて「イメージ」と表示
- 現在・今後の確認済みイベントが0件のため、架空イベントを掲載しない
- 閲覧数、ランキング、口コミ、広告実績を作らない
- 問い合わせ先が未設定のため、フォームと送信ボタンを表示しない

## 設定

公開URLとbasePathは [site.config.json](site.config.json) に集約しています。

GA4は既定で無効です。有効化する場合だけ、GitHub ActionsのVariablesまたは実行環境へ `NEXT_PUBLIC_GA4_ID=G-...` を設定します。秘密情報、問い合わせ本文、生の検索語は送信しません。

## GitHub Pages

1. リポジトリのSettings → PagesでSourceを「GitHub Actions」に設定
2. `main`へpush
3. qualityジョブの全検査成功後にのみdeploy
4. 公開URL、主要ページ、CSS、画像、canonical、sitemap、robotsを確認

実装対応表は [docs/IMPLEMENTATION_MATRIX.md](docs/IMPLEMENTATION_MATRIX.md)、最終判定は [docs/FINAL_AUDIT.md](docs/FINAL_AUDIT.md) を参照してください。
