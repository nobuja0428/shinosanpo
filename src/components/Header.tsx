"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { areas } from "@/content";

const AREA_KEY = "osanpoClubTokyoAreaV1";

const nav = [
  { href: "/courses/", label: "歩く" },
  { href: "/spots/", label: "立ち寄る" },
  { href: "/stories/", label: "知る" },
  { href: "/map/", label: "地図" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const pathArea = areas.find((area) => pathname.includes(`/${area.slug}/`));
      if (pathArea) {
        setSelectedArea(pathArea.id);
        localStorage.setItem(AREA_KEY, pathArea.id);
        return;
      }
      const saved = localStorage.getItem(AREA_KEY);
      if (saved && areas.some((area) => area.id === saved)) setSelectedArea(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <header className="siteHeader">
      <div className="headerInner">
        <Link href="/" className="brand" aria-label="おさんぽクラブ東京 ホーム">
          <span className="brandMark" aria-hidden="true">歩</span>
          <span><strong>おさんぽクラブ東京</strong><small>Tokyo Sanpo Club</small></span>
        </Link>
        <label className="areaSwitcher">
          <span>エリア</span>
          <select
            aria-label="表示するエリア"
            value={selectedArea}
            onChange={(event) => {
              const next = event.target.value;
              setSelectedArea(next);
              if (!next) {
                localStorage.removeItem(AREA_KEY);
                router.push("/areas/");
                return;
              }
              localStorage.setItem(AREA_KEY, next);
              const area = areas.find((item) => item.id === next);
              if (area) router.push(`/areas/${area.slug}/`);
            }}
          >
            <option value="">全エリア</option>
            {areas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
          </select>
        </label>
        <button
          type="button"
          className="menuButton"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          メニュー
        </button>
        <nav id="primary-nav" className={open ? "primaryNav isOpen" : "primaryNav"} aria-label="主要メニュー">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/search/" aria-current={pathname.startsWith("/search") ? "page" : undefined} onClick={() => setOpen(false)}>
            検索
          </Link>
        </nav>
      </div>
    </header>
  );
}
