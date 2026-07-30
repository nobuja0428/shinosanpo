import { afterEach, describe, expect, it, vi } from "vitest";

describe("analytics", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    delete (globalThis as { window?: unknown }).window;
  });

  it("GA4無効時は送信しない", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA4_ENABLED", "false");
    vi.stubEnv("NEXT_PUBLIC_GA4_MEASUREMENT_ID", "");
    const { track } = await import("@/lib/analytics");
    expect(track("page_view")).toBe(false);
  });

  it("同じイベントを二重送信しない", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA4_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_GA4_MEASUREMENT_ID", "G-TEST123");
    const gtag = vi.fn();
    (globalThis as { window?: unknown }).window = { gtag };
    const { track, resetAnalyticsForTests } = await import("@/lib/analytics");
    resetAnalyticsForTests();
    expect(track("save_click", { content_id: "x" })).toBe(true);
    expect(track("save_click", { content_id: "x" })).toBe(false);
    expect(gtag).toHaveBeenCalledTimes(1);
  });

  it("禁止パラメータを除外", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA4_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_GA4_MEASUREMENT_ID", "G-TEST123");
    const gtag = vi.fn();
    (globalThis as { window?: unknown }).window = { gtag };
    const { track, resetAnalyticsForTests } = await import("@/lib/analytics");
    resetAnalyticsForTests();
    track("search_submit", { query: "秘密", query_length: 2 });
    expect(gtag).toHaveBeenCalledWith("event", "search_submit", { query_length: 2 });
  });
});
