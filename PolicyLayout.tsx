import Link from "next/link";
import { AreaCard, RouteCard, SpotCard, StoryCard } from "@/components/Cards";
import { MediaImage } from "@/components/MediaImage";
import { TrustPanel } from "@/components/TrustPanel";
import { areas, routes, spots, stories } from "@/content";
import { image, official, trust } from "@/content/shared";

const homeTrust = trust("2026-07-30", "2026-07-28", [
  official("高円寺純情商店街", "https://www.kouenji.or.jp/"),
  official("井の頭恩賜公園", "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/seibuk/inokashira/"),
  official("浅草寺", "https://www.senso-ji.jp/")
]);

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="heroCopy">
          <span className="eyebrow">高円寺・吉祥寺・浅草から</span>
          <h1 id="hero-title">東京を、<span>時間・予算・気分</span>から歩こう。</h1>
          <p className="lead">所要時間、予算、駅、休憩、トイレ、確認日を見比べて、自分に合う散歩を選べます。</p>
          <div className="heroActions">
            <Link href="/routes/" className="button primary">散歩コースを探す</Link>
            <Link href="/areas/" className="button">エリアから探す</Link>
          </div>
        </div>
        <MediaImage
          eager
          image={image("/assets/images/hero/hero-tokyo-walk.webp", "東京の街を歩く人と商店街を表現したイメージ", 1600, 900)}
        />
      </section>

      <section className="section" aria-labelledby="usable-title">
        <div className="sectionHeader">
          <span className="eyebrow">いま使える条件</span>
          <h2 id="usable-title">今日の時間と気分から絞る</h2>
          <p>公開中のコース・スポットに実際に付いている条件だけを表示しています。</p>
        </div>
        <div className="chipRow">
          {["2時間以内", "予算2,500円以内", "一人で", "デート", "家族", "公園", "歴史", "雨の日候補"].map((tag) => (
            <Link key={tag} href={`/search/?tag=${encodeURIComponent(tag)}`} className="chip">{tag}</Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="areas-title">
        <div className="sectionHeader">
          <span className="eyebrow">重点エリア</span>
          <h2 id="areas-title">まずは3つの街から</h2>
          <p>公開しているのは高円寺・吉祥寺・浅草の3エリアです。未公開エリアを完成済みとは表示しません。</p>
        </div>
        <div className="cardGrid">{areas.map((area) => <AreaCard key={area.id} area={area} />)}</div>
      </section>

      <section className="section" aria-labelledby="map-title">
        <div className="sectionHeader">
          <span className="eyebrow">位置関係の目安</span>
          <h2 id="map-title">街とスポットを一覧でつかむ</h2>
          <p>APIキーを使わず、掲載対象を同じ件数で確認できます。正確な場所は外部のGoogleマップで開きます。</p>
        </div>
        <div className="mapDiagram">
          {areas.map((area) => (
            <article className="mapArea" key={area.id}>
              <h3>{area.name}</h3>
              <p>{spots.filter((spot) => spot.areaId === area.id).length}スポット掲載</p>
              <Link href={`/map/?area=${area.id}`}>地図一覧で見る</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="routes-title">
        <div className="sectionHeader">
          <span className="eyebrow">おすすめ散歩コース</span>
          <h2 id="routes-title">所要・距離・予算を比べる</h2>
        </div>
        <div className="cardGrid">{routes.map((route) => <RouteCard key={route.id} route={route} />)}</div>
      </section>

      <section className="section" aria-labelledby="events-title">
        <div className="notice">
          <span className="eyebrow">イベント</span>
          <h2 id="events-title">現在・今後の確認済みイベントはありません</h2>
          <p>公式情報と確認日が揃ったイベントだけを掲載します。終了イベントを予定として表示しません。</p>
          <Link href="/events/">掲載方針を見る</Link>
        </div>
      </section>

      <section className="section" aria-labelledby="spots-title">
        <div className="sectionHeader">
          <span className="eyebrow">店・スポット発見</span>
          <h2 id="spots-title">目的から立ち寄り先を探す</h2>
        </div>
        <div className="cardGrid">{spots.slice(0, 6).map((spot) => <SpotCard key={spot.id} spot={spot} />)}</div>
        <p><Link href="/search/">条件を組み合わせて検索する</Link></p>
      </section>

      <section className="section" aria-labelledby="stories-title">
        <div className="sectionHeader">
          <span className="eyebrow">更新日のある読み物</span>
          <h2 id="stories-title">街の歩き方を知る</h2>
        </div>
        <div className="cardGrid">{stories.map((story) => <StoryCard key={story.id} story={story} />)}</div>
      </section>

      <section className="section" aria-labelledby="trust-title">
        <div className="sectionHeader">
          <span className="eyebrow">編集の透明性</span>
          <h2 id="trust-title">確認したこと、未確認のことを分ける</h2>
          <p>公開情報を参照していますが、現地取材は未実施です。AI画像は実景ではなく、すべて「イメージ」と表示します。</p>
        </div>
        <TrustPanel trust={homeTrust} />
      </section>

      <section className="section" aria-labelledby="return-title">
        <div className="sectionHeader">
          <span className="eyebrow">再訪導線</span>
          <h2 id="return-title">気になる散歩を端末に保存する</h2>
          <p>ログインは不要です。保存内容はこのブラウザのLocalStorageに保持され、保存ページから削除できます。</p>
        </div>
        <div className="heroActions">
          <Link href="/favorites/" className="button primary">保存一覧を見る</Link>
          <Link href="/privacy/" className="button">保存データの扱い</Link>
        </div>
      </section>
    </>
  );
}
