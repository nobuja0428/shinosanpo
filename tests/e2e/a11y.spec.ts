import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import site from "../../site.config.json" with { type: "json" };

const pages = [
  "/",
  "/areas/",
  "/areas/koenji/",
  "/courses/",
  "/courses/koenji-first/",
  "/spots/sensoji/",
  "/stories/asakusa-first-hour/",
  "/events/",
  "/map/",
  "/search/",
  "/favorites/",
  "/operation/",
  "/contact/"
];

test("axe critical・serious違反0", async ({ page }) => {
  for (const path of pages) {
    await page.goto(`${site.productionBasePath}${path}`);
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const serious = result.violations.filter((item) => item.impact === "critical" || item.impact === "serious");
    expect(serious, path).toEqual([]);
  }
});
