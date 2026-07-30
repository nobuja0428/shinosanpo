"use client";

import Link from "next/link";
import { useState } from "react";
import type { ContentType } from "@/content";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { AnalyticsEventName } from "@/lib/analytics";
import { track } from "@/lib/analytics";

type ActionLink = {
  href: string;
  label: string;
  external?: boolean;
  primary?: boolean;
  eventName?: AnalyticsEventName;
};

export function ActionPanel({
  type,
  id,
  title,
  links
}: {
  type: ContentType;
  id: string;
  title: string;
  links: ActionLink[];
}) {
  const [message, setMessage] = useState("");

  const onShare = async () => {
    const url = window.location.href.split("?")[0].split("#")[0];
    const canShare = "share" in navigator && typeof navigator.share === "function";
    try {
      if (canShare) await navigator.share({ title, url });
      else await navigator.clipboard.writeText(url);
      setMessage(canShare ? "共有画面を開きました" : "URLをコピーしました");
    } catch {
      setMessage("共有をキャンセルしました");
    }
  };

  return (
    <aside className="actionPanel" aria-label="行動パネル">
      <h2>次にすること</h2>
      {links.map((link) => link.external ? (
        <a
          className={link.primary ? "button primary" : "button"}
          href={link.href}
          key={`${link.href}-${link.label}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => link.eventName && track(link.eventName, { content_type: type, content_id: id })}
        >
          {link.label}<span className="srOnly">（外部サイト）</span>
        </a>
      ) : (
        <Link
          className={link.primary ? "button primary" : "button"}
          href={link.href}
          key={`${link.href}-${link.label}`}
          onClick={() => link.eventName && track(link.eventName, { content_type: type, content_id: id })}
        >
          {link.label}
        </Link>
      ))}
      <div className="saveShare">
        <FavoriteButton type={type} id={id} />
        <button type="button" onClick={onShare}>共有する</button>
        <span className="srOnly" aria-live="polite">{message}</span>
      </div>
    </aside>
  );
}
