/**
 * In this file we define our test fixtures.
 * @see https://playwright.dev/docs/test-fixtures#test-fixtures
 */
import { test as base } from "@playwright/test";

import { createOrgsFixture } from "./org";
import { createUsersFixture } from "./users";

type TestFixtures = {
  orgs: ReturnType<typeof createOrgsFixture>;
  users: ReturnType<typeof createUsersFixture>;
};

// Extend base test with our fixtures.
export const test = base.extend<TestFixtures>({
  orgs: async ({ page }, use) => {
    const orgsFixture = createOrgsFixture(page);
    await use(orgsFixture);
  },

  users: async ({ page }, use) => {
    const usersFixture = createUsersFixture(page);
    await use(usersFixture);
  },
});

// Now, this "test" can be used in multiple test files, and each of them will get the fixtures.
export default test;
