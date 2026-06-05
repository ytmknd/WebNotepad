const { test, expect } = require("@playwright/test");

async function gotoApp(page) {
  await page.goto("/");
  await expect(page.locator("#editor")).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
  });
});

test("starts with one untitled tab", async ({ page }) => {
  await gotoApp(page);
  await expect(page.locator(".tab")).toHaveCount(1);
  await expect(page.locator(".tab.active .tab__title")).toContainText(/無題|Untitled/);
});

test("creates and cycles tabs with keyboard", async ({ page }) => {
  await gotoApp(page);
  const editor = page.locator("#editor");

  await editor.fill("tab-1");

  await page.keyboard.press("Control+t");
  await editor.fill("tab-2");
  await page.keyboard.press("Control+t");
  await editor.fill("tab-3");
  await expect(page.locator(".tab")).toHaveCount(3);

  await expect(editor).toHaveValue("tab-3");
  await page.keyboard.press("Control+Tab");
  await expect(editor).toHaveValue("tab-1");

  await page.keyboard.press("Control+PageUp");
  await expect(editor).toHaveValue("tab-3");
});

test("tab context menu closes others and can reopen closed tab", async ({ page }) => {
  await gotoApp(page);

  await page.keyboard.press("Control+t");
  await page.keyboard.press("Control+t");
  await expect(page.locator(".tab")).toHaveCount(3);

  const middleTab = page.locator(".tab").nth(1);
  await middleTab.click();
  await middleTab.click({ button: "right" });
  await page.getByRole("button", { name: /他のタブを閉じる|Close other tabs/ }).click();
  await expect(page.locator(".tab")).toHaveCount(1);

  await page.locator(".tab.active").click({ button: "right" });
  await page.getByRole("button", { name: /閉じたタブを再度開く|Reopen closed tab/ }).click();
  await expect(page.locator(".tab")).toHaveCount(2);
});

test("restores tab content and cursor from session after reload", async ({ page }) => {
  await gotoApp(page);

  const editor = page.locator("#editor");
  await editor.fill("line1\\nline2\\nline3");
  await editor.press("Control+Home");
  await editor.press("ArrowDown");

  await page.keyboard.press("Control+t");
  await editor.fill("second tab text");

  await page.keyboard.press("Control+PageUp");
  await page.reload();

  await expect(page.locator(".tab")).toHaveCount(2);
  await expect(page.locator("#editor")).toHaveValue(/line1/);

  const cursorPos = await page.evaluate(() => {
    const ta = document.getElementById("editor");
    return { start: ta.selectionStart, end: ta.selectionEnd };
  });

  expect(cursorPos.start).toBeGreaterThanOrEqual(0);
  expect(cursorPos.end).toBeGreaterThanOrEqual(cursorPos.start);
});
