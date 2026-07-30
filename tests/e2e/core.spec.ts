import { expect, test } from "@playwright/test";
import site from "../../site.config.json" with { type: "json" };

const url = (path: string) => `${site.productionBasePath}${path}`;

const widths = [1440, 1024, 768, 375, 320];
const courses = [
  "/",
  "/areas/",
  "/areas/koenji/",
  "/areas/kichijoji/",
  "/areas/asakusa/",
  "/courses/",
  "/courses/koenji-first/",
  "/courses/kichijoji-park/",
  "/courses/asakusa-history/",
  "/spots/",
  "/spots/sensoji/",
  "/spots/inokashira-park/",
  "/spots/koenji-junjo/",
  "/stories/",
  "/stories/asakusa-first-hour/",
  "/events/",
  "/map/",
  "/search/",
  "/favorites/",
  "/about/",
  "/operation/",
  "/editorial-policy/",
  "/privacy/",
  "/advertise/",
  "/contact/"
];

for (const width of widths) {
  test.describe(`${width}px 表示`, () => {
    for (const route of courses) {
      test(`${route} の表示`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        const errors: string[] = [];
        page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
        page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(url(route));
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(overflow, `${route} 横スクロール`).toBe(false);
        expect(errors).toEqual([]);
      });
    }

    test("ホーム画面キャプチャ", async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url("/"));
      await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true });
    });
  });
}

test("検索・0件復帰・URL・履歴", async ({ page }) => {
  await page.goto(url("/search/"));
  await page.getByLabel("キーワード").fill("存在しない検索語zzzz");
  await page.getByRole("button", { name: "検索する" }).click();
  await expect(page.getByText("条件に合う情報がありません")).toBeVisible();
  await expect(page).toHaveURL(/q=/);
  await page.getByRole("button", { name: "すべて解除" }).first().click();
  await expect(page.getByText(/件見つかりました/)).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/q=/);
});

test("複数フィルター・個別解除", async ({ page }) => {
  await page.goto(url("/search/"));
  await page.getByLabel("一人で").check();
  await page.getByLabel("歴史").check();
  await page.getByRole("button", { name: "検索する" }).click();
  await expect(page.getByText(/件見つかりました/)).toBeVisible();
  await page.getByRole("button", { name: "歴史 ×" }).click();
  await expect(page).not.toHaveURL(/%E6%AD%B4%E5%8F%B2/);
});

test("お気に入り追加・再読込・解除", async ({ page }) => {
  await page.goto(url("/spots/sensoji/"));
  await page.getByRole("button", { name: "☆ 保存する" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "★ 保存済み" })).toBeVisible();
  await page.goto(url("/favorites/"));
  await expect(page.getByRole("heading", { name: "浅草寺周辺" })).toBeVisible();
  await page.getByRole("button", { name: "保存を解除" }).click();
  await expect(page.getByText("保存したページはありません")).toBeVisible();
});

test("モバイルメニュー・下部ナビ・キーボード・200％", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto(url("/"));
  await page.getByRole("button", { name: "メニュー" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation", { name: "主要メニュー", exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "モバイル主要メニュー" })).toBeVisible();
  await page.keyboard.press("Tab");
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBe(false);
});

test("共有URLに検索語を含めない", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.addInitScript(() => { Object.defineProperty(navigator, "share", { value: undefined, configurable: true }); });
  await page.goto(url("/spots/sensoji/?q=private"));
  await page.getByRole("button", { name: "共有する" }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).not.toContain("q=");
});

test("不存在URLは404で復帰導線あり", async ({ page }) => {
  const response = await page.goto(url("/not-existing-page/"));
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "ページが見つかりません" })).toBeVisible();
  await expect(page.getByRole("link", { name: "ホームへ戻る" })).toBeVisible();
});

test("エリア選択を全画面ヘッダーに保持", async ({ page }) => {
  await page.goto(url("/"));
  await page.getByLabel("表示するエリア").selectOption("asakusa");
  await expect(page).toHaveURL(/\/areas\/asakusa\//);
  await page.goto(url("/stories/"));
  await expect(page.getByLabel("表示するエリア")).toHaveValue("asakusa");
});

test("地図のピンとカードを同期", async ({ page }) => {
  await page.goto(url("/map/"));
  await page.getByRole("button", { name: /浅草寺周辺/ }).click();
  await expect(page.locator("#spot-card-sensoji")).toHaveClass(/isActive/);
  await expect(page.locator(".mapPin[aria-pressed='true']")).toHaveCount(1);
});
