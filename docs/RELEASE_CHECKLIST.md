# SHINOSANPO リリースチェックリスト

## ローカル完了

- [x] `npm ci`
- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run validate:content`
- [x] `npm run test`
- [x] `npm run build`
- [x] `npm run test:links`
- [x] `npm run test:seo`
- [x] `npm run test:security`
- [x] `npm run test:file-roles`
- [x] `npm run test:output`
- [x] `npm run test:e2e`
- [x] axe重大・深刻違反0
- [x] `npm run test:lighthouse`
- [x] 1440 / 1024 / 768 / 375 / 320px
- [x] キーボード / 200％拡大
- [x] 検索 / 絞り込み / 0件復帰 / URL履歴
- [x] お気に入り / 共有 / 地図同期 / 404
- [x] ファイル役割と階層
- [x] 旧公開パス0 / ハッシュルーティング0
- [x] `out`内のCSS・JavaScript・画像・内部リンク
- [x] ZIP破損なし・直下構造・再展開後検査
- [x] ZIPから`node_modules`・`.git`・一時レポートを除外

## GitHub反映時

- [ ] GitHub Desktopで`nobuja0428/shinosanpo`をclone
- [ ] 既存mainのローカルバックアップ
- [ ] ZIPを別フォルダーへ展開
- [ ] ZIP自体ではなく展開後の中身をコピー
- [ ] `src`、`public`、`.github`の階層を確認
- [ ] `page (1).tsx`等がないことを確認
- [ ] GitHub DesktopのChangesで差分確認
- [ ] commit・push
- [ ] CI成功
- [ ] Pages SourceをGitHub Actionsへ設定
- [ ] Pages quality成功後のdeploy成功

## 公開後

- [ ] `https://nobuja0428.github.io/shinosanpo/`
- [ ] エリア一覧・詳細
- [ ] コース一覧・詳細
- [ ] スポット一覧・詳細
- [ ] 読み物一覧・詳細
- [ ] 地図・検索・保存
- [ ] 問い合わせ・編集方針・プライバシー
- [ ] 404
- [ ] sitemap.xml・robots.txt
- [ ] CSS・画像・内部リンク
- [ ] 1440 / 1024 / 768 / 375 / 320px・200％
- [ ] コンソールエラー0

未実施項目にはチェックを付けていません。
