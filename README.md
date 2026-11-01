# Playwright Core vs. Playwright Test Runner

This document outlines the key differences between the standalone `playwright` core library and the full-featured `@playwright/test` framework.

---

## Overview

| Feature | Core Package (`playwright`) | Test Runner Package (`@playwright/test`) |
| :--- | :--- | :--- |
| **Primary Purpose** | Browser automation & web scraping | End-to-End (E2E) software testing |
| **Main Exports** | `chromium`, `firefox`, `webkit` | `test`, `expect`, `defineConfig` |
| **Test Runner** | None (requires Jest, Mocha, Vitest, etc.) | Built-in test runner with parallel execution |
| **Assertions** | None (requires external `chai`, `expect`, etc.) | Built-in web-first assertions with auto-waiting |
| **Test Isolation** | Manual context/page creation and cleanup | Automatic page & context fixtures (`{ page }`) |
| **Configuration** | Handled manually in code | Managed via `playwright.config.ts` / `.js` |
| **Reporting & Tooling** | None built-in | HTML reports, UI mode, trace viewer, `--debug` |

---

## 1. Core Package (`playwright`)

The `playwright` package provides raw API access to automate Chromium, Firefox, and WebKit browsers. It does not include a test runner, assertion library, or configuration manager out of the box.

### Key Use Cases
* Web scraping or dynamic data extraction scripts.
* Automating recurring tasks or PDF generation.
* Integration into existing custom test frameworks (e.g., standard Jest setups).

### Code Example
```javascript
import { chromium } from 'playwright';

(async () => {
  // Manual browser lifecycle management required
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://example.com');
  console.log(await page.title());
  
  await browser.close();
})();
```

---

## 2. Test Runner Package (`@playwright/test`)

The `@playwright/test` package includes the core library and adds a complete testing ecosystem designed for E2E web application testing.

### Key Included Features
* **Built-in Fixtures:** Automatically manages browser contexts and page teardowns per test via `{ page }`.
* **Web-First Assertions:** Built-in `expect()` with automatic waiting and retry loops.
* **Execution & Parallelism:** Multi-worker test runner managed via `playwright.config.js`.
* **Developer Tooling:** Built-in support for Trace Viewer, HTML Reports, UI Mode (`--ui`), and step-by-step debugging (`--debug`).

### Code Example
```javascript
import { test, expect } from '@playwright/test';

// Browser, context, and page isolation are managed automatically
test('homepage title check', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

---

## Summary Recommendation

* **Use `@playwright/test`** for standard automated web application testing.
* **Use `playwright`** for non-testing scripts (crawlers, bots, server-side PDF generators) or when retrofitting Playwright into a pre-existing non-Playwright runner.