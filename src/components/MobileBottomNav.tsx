"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "ホーム", icon: "⌂" },
  { href: "/search/", label: "検索", icon: "⌕" },
  { href: "/map/", label: "地図", icon: "◇" },
  { href: "/favorites/", label: "保存", icon: "☆" }
];

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="mobileNav" aria-label="モバイル主要メニュー">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
            <span aria-hidden="true">{item.icon}</span>
            <small>{item.label}</small>
          </Link>
        );
      })}
    </nav>
  );
}
