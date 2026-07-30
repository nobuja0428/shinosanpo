import { RouteCard } from "@/components/Cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PeriodFilter } from "@/components/PeriodFilter";
import { routes } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = pageMetadata("東京の散歩コース", "所要時間・距離・予算・開始地点・終了地点・途中離脱駅を比べられる3コースです。", "/routes/");

export default function RoutesPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "散歩コース" }]} />
      <span className="eyebrow">歩く</span>
      <h1>東京の散歩コース</h1>
      <p className="lead">移動、食事・休憩、トイレの順に実用情報を確認できます。現地未確認のため、当日は公式情報と現地案内をご確認ください。</p>
      <Suspense fallback={<p>期間条件を準備しています…</p>}><PeriodFilter /></Suspense>
      <div className="cardGrid">{routes.map((route) => <RouteCard key={route.id} route={route} />)}</div>
    </div>
  );
}
