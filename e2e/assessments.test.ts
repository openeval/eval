import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";

import { test } from "./fixtures";

test.afterEach(async ({ users, orgs }) => {
  await orgs.deleteAll();
  await users.deleteAll();
});

test.describe("Assessments", () => {
  test.beforeEach(async ({ page, users, orgs }) => {
    const user = await users.create(undefined, { isRecruiter: true });
    const org = await orgs.create({ owner: user });

    // connect to the created organization
    await user.update({ activeOrg: { connect: { id: org.id } } });

    await user.apiLogin();
    await page.goto("/assessments");
  });

  test("Create a new assessment", async ({ page }) => {
    await page.getByTestId("add-assessment-button").click();
    await expect(page).toHaveTitle("New Assessments");

    const form = page.locator("#assessment-form");
    await expect(form).toBeVisible();
    await form.locator('input[name="title"]').fill(faker.lorem.text());
    await form
      .locator('textarea[name="description"]')
      .fill(faker.lorem.paragraphs(Math.floor(Math.random() * 11)));
    await form.getByTestId("confirmation-button").click();

    const toast = await page.waitForSelector('[data-testid="toast-default"]');
    expect(toast).toBeTruthy();
    // await expect(page).toHaveTitle("New Assessments - tasks");
  });
});
