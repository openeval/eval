import { expect } from "@playwright/test";

import { test } from "./fixtures";

test.describe.configure({ mode: "parallel" });

test.afterEach(async ({ users }) => {
  await users.deleteAll();
});

test.describe("Onboarding", () => {
  test.beforeEach(async ({ page, users }) => {
    //can create users with params , like complete onboarding false
    const user = await users.create();
    await user.apiLogin();
    await page.goto("/");
  });

  test("should complete onboarding as recruiter", async ({ page, users }) => {
    const [user] = users.get();

    await page.goto("/onboarding");
    await expect(page).toHaveTitle(/Onboarding/);

    // user type form
    await page.getByTestId("recruiter").click();
    await page.getByTestId("confirmation-button").click();

    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle("My organization");

    // organization form
    await page.locator('input[name="name"]').fill(`${user.email} Org`);
    await page.getByTestId("confirmation-button").click();

    await expect(page).toHaveTitle("Assessments");
  });

  test("should complete onboarding as candidate", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page).toHaveTitle(/Onboarding/);

    // user type form
    await page.getByTestId("candidate").click();
    await page.getByTestId("confirmation-button").click();
    await expect(page).toHaveTitle(/Onboarding/);

    // candidatate details form
    await page.locator('input[name="name"]').fill(`John`);
    await page.locator('input[name="lastName"]').fill(`Doeh`);
    await page.getByTestId("confirmation-button").click();

    await expect(page.getByTestId("step-github-connect")).toBeVisible();
  });
});
