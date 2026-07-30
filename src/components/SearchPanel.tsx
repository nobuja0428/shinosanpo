"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { areas, courses } from "@/content";
import type { AreaId } from "@/content";
import { FilterPanel, searchTags } from "@/components/FilterPanel";
import { filterSearch, searchIndex } from "@/lib/search";
import { track } from "@/lib/analytics";

export function SearchPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [area, setArea] = useState<AreaId | "">((params.get("area") as AreaId | null) ?? "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    params.getAll("tag").filter((tag) => searchTags.includes(tag as (typeof searchTags)[number]))
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery(params.get("q") ?? "");
      setArea((params.get("area") as AreaId | null) ?? "");
      setSelectedTags(
        params.getAll("tag").filter((tag) => searchTags.includes(tag as (typeof searchTags)[number]))
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, [params]);

  const results = useMemo(() => filterSearch(searchIndex, query, area, selectedTags), [query, area, selectedTags]);

  const updateUrl = (nextQuery: string, nextArea: AreaId | "", nextTags: string[]) => {
    const next = new URLSearchParams();
    if (nextQuery.trim()) next.set("q", nextQuery.trim());
    if (nextArea) next.set("area", nextArea);
    nextTags.forEach((tag) => next.append("tag", tag));
    router.push(`${pathname}${next.size ? `?${next}` : ""}`);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    updateUrl(query, area, selectedTags);
    track("search_submit", { query_length: query.trim().length, result_count: results.length, filter_count: selectedTags.length + (area ? 1 : 0) });
    if (area || selectedTags.length) {
      track("filter_apply", {
        area_selected: Boolean(area),
        filter_count: selectedTags.length + (area ? 1 : 0),
        result_count: results.length
      });
    }
  };

  const clearAll = () => {
    setQuery("");
    setArea("");
    setSelectedTags([]);
    router.push(pathname);
  };

  return (
    <>
      <form className="filterPanel" onSubmit={submit} role="search">
        <FilterPanel
          areas={areas}
          query={query}
          area={area}
          selectedTags={selectedTags}
          onQueryChange={setQuery}
          onAreaChange={setArea}
          onTagsChange={setSelectedTags}
          onClearAll={clearAll}
          onRemoveQuery={() => {
            setQuery("");
            updateUrl("", area, selectedTags);
          }}
          onRemoveArea={() => {
            setArea("");
            updateUrl(query, "", selectedTags);
          }}
          onRemoveTag={(tag) => {
            const next = selectedTags.filter((item) => item !== tag);
            setSelectedTags(next);
            updateUrl(query, area, next);
          }}
        />
      </form>
      <p aria-live="polite"><strong>{results.length}件</strong>見つかりました</p>
      {results.length ? (
        <div className="searchResults">
          {results.map((item) => (
            <article className="searchResult" key={`${item.type}-${item.id}`}>
              <span className="eyebrow">{item.type}</span>
              <h2><Link href={item.href}>{item.title}</Link></h2>
              <p>{item.summary}</p>
              <div className="tagList">{item.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      ) : (
        <div className="emptyState">
          <h2>条件に合う情報がありません</h2>
          <p>条件を1つ外すか、すべて解除してやり直せます。</p>
          <div className="heroActions">
            {selectedTags[0] && <button type="button" onClick={() => { const next = selectedTags.slice(1); setSelectedTags(next); updateUrl(query, area, next); }}>条件を1つ外す</button>}
            <button type="button" onClick={clearAll}>すべて解除</button>
            <Link className="button" href="/areas/">重点エリアを見る</Link>
            <Link className="button" href={`/courses/${courses[0].slug}/`}>近い条件のコースを見る</Link>
          </div>
        </div>
      )}
    </>
  );
}
