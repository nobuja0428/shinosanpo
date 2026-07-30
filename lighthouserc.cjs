module.exports = {
  ci: {
    collect: {
      url: [
        "http://127.0.0.1:4173/shinosanpo/",
        "http://127.0.0.1:4173/shinosanpo/courses/koenji-first/"
      ],
      startServerCommand: "npm run serve:out",
      startServerReadyPattern: "Serving",
      chromePath: "/tmp/shinosanpo-chromium-runtime/chromium",
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
        chromeFlags: "--headless --no-sandbox --disable-dev-shm-usage --disable-gpu"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./lighthouse-report"
    }
  }
};
