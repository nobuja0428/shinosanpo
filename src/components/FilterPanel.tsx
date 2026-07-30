import type { Area, AreaId } from "@/content";

export const searchTags = [
  "2時間以内",
  "予算2,500円以内",
  "一人で",
  "デート",
  "家族",
  "公園",
  "歴史",
  "雨の日候補"
] as const;

export function FilterPanel({
  areas,
  query,
  area,
  selectedTags,
  onQueryChange,
  onAreaChange,
  onTagsChange,
  onClearAll,
  onRemoveQuery,
  onRemoveArea,
  onRemoveTag
}: {
  areas: Area[];
  query: string;
  area: AreaId | "";
  selectedTags: string[];
  onQueryChange: (value: string) => void;
  onAreaChange: (value: AreaId | "") => void;
  onTagsChange: (value: string[]) => void;
  onClearAll: () => void;
  onRemoveQuery: () => void;
  onRemoveArea: () => void;
  onRemoveTag: (tag: string) => void;
}) {
  return (
    <>
      <div className="filterRow">
        <div className="field">
          <label htmlFor="search-query">キーワード</label>
          <input
            id="search-query"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="街・公園・歴史など"
          />
        </div>
        <div className="field">
          <label htmlFor="search-area">エリア</label>
          <select
            id="search-area"
            value={area}
            onChange={(event) => onAreaChange(event.target.value as AreaId | "")}
          >
            <option value="">すべて</option>
            {areas.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>
        <button className="primary" type="submit">検索する</button>
        <button type="button" onClick={onClearAll}>すべて解除</button>
      </div>
      <fieldset>
        <legend>条件</legend>
        <div className="chipRow">
          {searchTags.map((tag) => (
            <label className="chip" key={tag}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={(event) => {
                  const next = event.target.checked
                    ? [...selectedTags, tag]
                    : selectedTags.filter((item) => item !== tag);
                  onTagsChange(next);
                }}
              />
              {tag}
            </label>
          ))}
        </div>
      </fieldset>
      {(query || area || selectedTags.length > 0) && (
        <div className="activeFilters" aria-label="選択中の条件">
          {query && <button type="button" onClick={onRemoveQuery}>キーワード ×</button>}
          {area && (
            <button type="button" onClick={onRemoveArea}>
              {areas.find((item) => item.id === area)?.name} ×
            </button>
          )}
          {selectedTags.map((tag) => (
            <button key={tag} type="button" onClick={() => onRemoveTag(tag)}>{tag} ×</button>
          ))}
        </div>
      )}
    </>
  );
}
