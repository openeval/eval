import { expect } from "@playwright/test";

import { test } from "./fixtures";

test.afterEach(async ({ users }) => {
  await users.deleteAll();
});

test.describe("Authentication", () => {
  test("should complete onboarding as recruiter", async ({ page, users }) => {
    const user = await users.create();
    await user.login();
    await page.goto("/");

    await expect(page).toHaveTitle(/Onboarding/);
  });
});
