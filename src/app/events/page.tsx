import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalendarDownload } from "@/components/CalendarDownload";
import { PeriodFilter } from "@/components/PeriodFilter";
import { events } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = pageMetadata("東京の散歩イベント", "現在・今後の確認済みイベントがある場合だけ掲載します。", "/events/");

export default function EventsPage() {
  return (
    <div className="page policy">
      <Breadcrumbs items={[{ label: "イベント" }]} />
      <span className="eyebrow">更新待ち</span>
      <h1>東京の散歩イベント</h1>
      <Suspense fallback={<p>期間条件を準備しています…</p>}><PeriodFilter empty /></Suspense>
      <div className="notice">
        <h2>現在・今後の確認済みイベントはありません</h2>
        <p>公式URL・情報確認日・最終更新日が揃ったイベントだけを掲載します。終了日時を過ぎたイベントを予定として表示しません。</p>
      </div>
      {events.map((event) => (
        <article className="searchResult" key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.startAt}〜{event.endAt}</p>
          <a href={event.officialUrl} target="_blank" rel="noopener noreferrer">公式情報</a>
          <CalendarDownload event={event} />
        </article>
      ))}
      <section>
        <h2>状態の扱い</h2>
        <p>予定、開催中、終了、中止、延期、更新待ちを分けます。中止・延期・更新待ちは通常の予定と同じ見た目にしません。</p>
      </section>
    </div>
  );
}
