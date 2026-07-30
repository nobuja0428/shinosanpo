import type { TrustInfo } from "@/content";
import { trustLabel } from "@/lib/content";
import { TrackedExternalLink } from "@/components/TrackedLink";

export function TrustPanel({ trust }: { trust: TrustInfo }) {
  return (
    <aside className="trustPanel" aria-label="情報の確認状況">
      <div>
        <span className="eyebrow">情報の確認状況</span>
        <strong>{trustLabel(trust)}</strong>
      </div>
      <dl>
        <div><dt>最終更新日</dt><dd><time dateTime={trust.updatedAt}>{trust.updatedAt}</time></dd></div>
        <div><dt>情報確認日</dt><dd>{trust.verifiedAt ?? "記録なし"}</dd></div>
        <div><dt>現地取材</dt><dd>{trust.isFieldChecked ? "実施済み" : "未実施"}</dd></div>
        <div><dt>AI補助</dt><dd>{trust.aiAssisted ? "構成・表現に使用" : "不使用"}</dd></div>
      </dl>
      {trust.sources.length > 0 && (
        <details>
          <summary>参照した公式情報</summary>
          <ul>
            {trust.sources.map((source) => (
              <li key={source.url}>
                <TrackedExternalLink
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="source_open"
                  eventData={{ source_label: source.label }}
                >
                  {source.label}<span className="srOnly">（外部サイト）</span>
                </TrackedExternalLink>
              </li>
            ))}
          </ul>
        </details>
      )}
    </aside>
  );
}
