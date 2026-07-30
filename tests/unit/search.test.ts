import { describe, expect, it } from "vitest";
import { filterSearch, searchIndex } from "@/lib/search";

describe("filterSearch", () => {
  it("地域で絞り込める", () => expect(filterSearch(searchIndex, "", "koenji", []).every((item) => item.areaId === "koenji")).toBe(true));
  it("複数条件はAND", () => expect(filterSearch(searchIndex, "", "", ["一人で", "歴史"]).some((item) => item.id === "asakusa-history")).toBe(true));
  it("該当なしは空配列", () => expect(filterSearch(searchIndex, "存在しない検索語zzzz", "", [])).toEqual([]));
  it("NFKCで全角半角を正規化", () => expect(filterSearch(searchIndex, "２時間", "", []).some((item) => item.id === "koenji-first")).toBe(true));
});
