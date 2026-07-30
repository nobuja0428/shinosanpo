"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const periods = [
  { id: "today", label: "今日" },
  { id: "weekend", label: "今週末" },
  { id: "month", label: "今月" }
] as const;

export function PeriodFilter({ empty = false }: { empty?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const selected = params.get("period") ?? "";

  const select = (period: string) => {
    const next = new URLSearchParams(params);
    if (period === selected) next.delete("period");
    else next.set("period", period);
    router.push(`${pathname}${next.size ? `?${next}` : ""}`);
  };

  return (
    <div className="filterPanel">
      <div className="chipRow" aria-label="期間で絞り込む">
        {periods.map((period) => (
          <button key={period.id} type="button" aria-pressed={selected === period.id} onClick={() => select(period.id)}>
            {period.label}
          </button>
        ))}
      </div>
      <p aria-live="polite">{empty ? "選択期間に掲載できる確認済みイベントは0件です。" : "常設の散歩コースを表示しています。"}</p>
    </div>
  );
}
