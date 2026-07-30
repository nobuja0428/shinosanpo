import { describe, expect, it } from "vitest";
import { parseFavorites, toggleFavorite } from "@/lib/favorites";

describe("favorites", () => {
  it("不正JSONで空配列", () => expect(parseFavorites("{")).toEqual([]));
  it("不正項目と重複を除く", () => expect(parseFavorites('[{"type":"course","id":"a"},{"type":"course","id":"a"},{"type":"x","id":"b"}]')).toEqual([{ type: "course", id: "a" }]));
  it("追加と削除", () => {
    const added = toggleFavorite([], { type: "spot", id: "sensoji" });
    expect(added).toEqual([{ type: "spot", id: "sensoji" }]);
    expect(toggleFavorite(added, { type: "spot", id: "sensoji" })).toEqual([]);
  });
});
