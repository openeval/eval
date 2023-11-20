import { expect } from "@playwright/test";

import { test } from "./fixtures";

test.afterEach(async ({ users }) => {
  await users.deleteAll();
});

test.describe("Sending feedback", () => {
  test.beforeEach(async ({ page, users }) => {
    const user = await users.create();
    await user.apiLogin();
    await page.goto("/");
  });

  test("should send global feedback", async ({ page }) => {
    await page.getByTestId("open-feedback-form-button").click();

    const form = page.locator("#feedback-form");
    await form
      .locator('textarea[name="message"]')
      .fill(`i would like to add a nice new feature`);
    await form.getByTestId("confirmation-button").click();

    //Wait for the toast to appear
    const toast = await page.waitForSelector('[data-testid="toast-default"]');
    expect(toast).toBeTruthy();
  });
});
