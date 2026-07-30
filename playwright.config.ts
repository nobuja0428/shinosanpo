import { defineConfig } from "@playwright/test";
import chromium from "@sparticuz/chromium";
import site from "./site.config.json" with { type: "json" };

const executablePath = "/tmp/osanpo-chromium-runtime/chromium";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    launchOptions: {
      executablePath,
      args: chromium.args.filter((arg) => !["--single-process", "--no-zygote"].includes(arg)),
      env: {
        ...process.env,
        HOME: "/tmp/osanpo-chromium-home",
        XDG_CACHE_HOME: "/tmp/osanpo-chromium-cache",
        LD_LIBRARY_PATH: "/tmp/osanpo-chromium-runtime/lib:/tmp/osanpo-chromium-runtime"
      }
    }
  },
  webServer: {
    command: "npm run serve:out",
    url: `http://127.0.0.1:4173${site.productionBasePath}/`,
    reuseExistingServer: false,
    timeout: 30_000
  }
});
