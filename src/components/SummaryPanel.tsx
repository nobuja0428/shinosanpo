export function SummaryPanel({ conclusion, why, before }: { conclusion: string; why: string; before: string }) {
  return (
    <section className="summaryBox" aria-labelledby="summary-title">
      <h2 id="summary-title">30秒要約</h2>
      <dl>
        <div><dt>結論</dt><dd>{conclusion}</dd></div>
        <div><dt>なぜ重要</dt><dd>{why}</dd></div>
        <div><dt>行く前に</dt><dd>{before}</dd></div>
      </dl>
    </section>
  );
}
