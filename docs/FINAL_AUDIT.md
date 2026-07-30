# SHINOSANPO 最終ローカル監査

確認日：2026-07-30  
対象：`shinosanpo`  
正式公開予定URL：`https://nobuja0428.github.io/shinosanpo/`  
productionBasePath：`/shinosanpo`

## 判定

GitHubへアップロードできるローカル本番候補として、コード生成とローカル検査を完了しました。GitHub接続、clone、push、ブランチ、PR、Actions実行、Pages設定、公開URL確認は今回行っていません。

コード側の受入条件は合格しています。外部作業は別枠で未確認のため、公開完了または本番公開済みとは判定しません。

## 使用した仕様

| 仕様 | 役割 | SHA-256 |
|---|---|---|
| `CODEX_PROMPT_新規地域メディア100点版.md` | 全体実行指示 | `f502554f02d8ab43d1754604e2782a187c3c76ec1eaf78595a9e338df5a09164` |
| `地域メディア_component_rules.json` | 35ルール・構造仕様・受入条件 | `83626c316cd1bf1e70ac3afca69f6211b58743a621ff83bc61e0e337f7bf82e2` |
| `地域メディア100サイト_設計ガイド_Codex用.docx` | 設計思想・判断基準 | `84545a9a36e02c4bead7f769c7291fe9cce1957b0c931a082a2ad768caa7f3c4` |
| `地域メディア100サイト_ホームページ設計ルール.xlsx` | 100サイト分析・ホーム構成・計測・A/Bテスト | `74446f3e3addbbe836709682fa675324aab555ea9dc8184b021607b83c951feb` |

## 作業環境

- 作業ディレクトリ：`shinosanpo-local-build`
- Node.js：v24.14.0
- npm：11.9.0
- `npm ci`：新規一時キャッシュから成功
- GitHub接続：不使用
- 壊れた公開リポジトリ：編集元・コピー元として不使用
- 正常候補ツリー：前回の合格コミットとファイル役割を監査し、空ディレクトリへ必要部分だけ再構成

## ファイル構造

- `.github/workflows`、`public/images`、`src/app`、`src/components`、`src/content`、`src/lib`、`src/styles`、`scripts`、`tests/unit`、`tests/e2e`、`docs`を階層維持
- `page (1).tsx`等の自動改名：0
- ルート直下へのTSX平坦化：0
- 同一内容の異名ファイル：0
- 必須34パス：すべて存在
- `Breadcrumbs.tsx`、`Header.tsx`、`Footer.tsx`、問い合わせページ、Workflowの役割一致：合格
- Markdown、TSX、YAMLの内容種別混入：0

## 実装

- ホーム：地域名、主副CTA、条件、重点3エリア、地図導線、3コース、イベント更新待ち、6スポット、3読み物、信頼、保存導線
- エリア：高円寺・吉祥寺・浅草の一覧・詳細・関連情報・更新履歴
- コース：3件。所要、距離、予算、対象、開始、終了、途中離脱、立寄り、電車、食事・休憩、トイレ、地図
- スポット：6件。公式情報、関連コース、地図、信頼表示
- 読み物：3件。30秒要約、関連情報、信頼表示
- 検索：キーワード、エリア、所要、予算、同行者、雨、テーマ、URL状態、戻る・進む、再読込
- 0件復帰：条件1つ解除、全解除、近いコース、エリア一覧
- 地図：APIキー不要の概略表示、カードとピンの相互同期、外部地図
- お気に入り：LocalStorage、追加・解除、再読込、存在しないIDの除外、使用不可時の安全処理
- イベント：6状態、手動上書き、終了誤掲出防止、確認済み0件時の更新待ち表示
- 問い合わせ：環境変数未設定時はフォーム・送信ボタン・架空連絡先なし
- 信頼表示：更新日、確認日、現地取材、公開情報、公式参照、AI利用
- モバイル：下部4ナビ、44px以上、safe-area、選択状態、キーボード
- 計測：既定OFF、測定ID未設定、11イベント、生検索語・個人情報・外部URL全文の除外、重複防止

## SEO

- canonical、OGP、Twitter Card：正式URL基準
- JSON-LD：Organization、WebSite、WebPage、BreadcrumbList、Article、Place
- sitemap.xml：`/shinosanpo/`基準
- robots.txt：`https://nobuja0428.github.io/shinosanpo/sitemap.xml`
- 検索・保存・404：noindex

## ローカル検査

| 検査 | 結果 |
|---|---:|
| `npm ci` | PASS |
| lint | PASS |
| TypeScript strict | PASS |
| content validation | PASS |
| unit test | 19/19 PASS |
| static build | 34ルート PASS |
| internal links | 33 HTML、切れ0 |
| SEO | 33 HTML PASS |
| security / legacy strings | 889ファイル PASS |
| file-role check | 125ファイル、必須34パス PASS |
| output check | 802ファイル、33 HTML PASS |
| Workflow YAML parse | PASS |
| Playwright / axe | 139/139 PASS |
| 画面幅 | 1440 / 1024 / 768 / 375 / 320 PASS |
| キーボード / 200％拡大 | PASS |
| 検索・絞り込み・履歴 | PASS |
| お気に入り・共有・地図同期・404 | PASS |
| コンソールエラー | 0 |
| Lighthouse ホーム | P93 / A100 / BP100 / SEO100 |
| Lighthouse コース詳細 | P97 / A100 / BP100 / SEO100 |
| ZIP破損・再展開検査 | PASS |

初回の日本語フォント一括同梱版はLighthouse Performanceがホーム68、コース詳細75で不合格でした。Unicode範囲別の分割フォントへ変更し、クリーンビルド後に上記の合格値を確認しています。不合格結果を成功扱いしていません。

## 出力検査

- `out/index.html`：存在
- `out/_next`のCSS・JavaScript：存在
- 主要ページ、404、sitemap、robots、画像：存在
- HTML内のローカル資産・内部リンク：`/shinosanpo/`基準
- canonical、OGP、sitemap、robots：正式URL基準
- 旧公開パス：0
- ハッシュルーティング：0
- 内部リンク切れ：0
- 画像切れ：0
- 空href・javascript URL：0
- APIキー・トークン・個人メール・ローカル絶対パス：0
- ZIP直下：`package.json`、`src`、`public`、`.github`、`out`
- ZIP除外：`node_modules`、`.git`、`.next`、一時テスト・Lighthouseレポート
- ZIP再展開後：ファイル役割、生成物、安全性検査 PASS

## 未確認

- GitHub Actionsの実行結果
- GitHub Pages設定とデプロイ
- 公開URL上の実ブラウザ確認
- iPhone・Android・Safari実機
- GA4実測
- 問い合わせ実送信
- Search Console
- 現地取材・当日の営業状況

## 自己採点

| 項目 | 点 |
|---|---:|
| A．ファイル構造と設定 | 15/15 |
| B．地域メディアUX | 20/20 |
| C．検索・発見・保存 | 15/15 |
| D．コンテンツ信頼性 | 15/15 |
| E．SEO | 10/10 |
| F．アクセシビリティ | 10/10 |
| G．速度・コード品質 | 10/10 |
| H．運用・再現性 | 5/5 |
| **コード側合計** | **100/100** |

外部確認待ちを除いたコード側の採点です。公開完了を意味しません。
