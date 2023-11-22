import { expect, type Page } from "@playwright/test";
import { UserType, type Prisma, type User } from "@prisma/client";
import { hashSync as hash } from "bcryptjs";
import { load as cheerioLoad } from "cheerio";
import smtpTester from "smtp-tester";

import { absoluteUrl } from "~/lib/utils";
import { prisma } from "~/server/db";
import * as UserRepo from "~/server/repositories/User";

// creates a user fixture instance and stores the collection
export const createUsersFixture = (page: Page) => {
  const store: { users: User[]; page: Page } = { users: [], page };
  return {
    create: async (
      opts?: Partial<Prisma.UserCreateInput>,
      scenario?: { isRecruiter?: true },
    ) => {
      if (scenario?.isRecruiter) {
        opts = { ...opts, completedOnboarding: true, type: UserType.RECRUITER };
      }

      const userDb = await createUserInDb(opts);

      const user = {
        ...userDb,
        login: async () => login({ email: userDb.email }, store.page),
        apiLogin: async () => apiLogin(userDb, store.page),
        update: async (data: Prisma.UserUpdateInput) =>
          await prisma.user.update({ data, where: { id: userDb.id } }),
      };
      store.users.push(user);
      return user;
    },
    get: () => store.users,
    deleteAll: async () => {
      await prisma.user.deleteMany({
        where: { id: { in: store.users.map((user) => user.id) } },
      });
      store.users = [];
    },
    delete: async (id: string) => {
      await prisma.user.delete({ where: { id } });
      store.users = store.users.filter((b) => b.id !== id);
    },
  };
};

// login using a replay of an E2E routine.
export async function login(user: Pick<User, "email">, page: Page) {
  const mailServer = smtpTester.init(4025);

  await page.goto("/login");

  // your login page test logic
  await page.locator('input[name="email"]').fill(user.email);
  await page.locator("[data-testid=singIn-email-button]").click({ delay: 100 });

  //Wait for the toast to appear
  const toast = await page.waitForSelector('[data-testid="toast-default"]');
  expect(toast).toBeTruthy();

  let emailLink = null as any;

  try {
    const { email } = await mailServer.captureOne(user.email, {
      wait: 1000,
    });

    const $ = cheerioLoad(email.html as string);

    emailLink = $("#magic-link").attr("href");
  } catch (cause) {
    console.error(`No message delivered to ${user.email} in 1 second.`, cause);
  }

  expect(emailLink).not.toBeFalsy();

  await page.goto(emailLink);
  await page.waitForLoadState("networkidle");
}

export async function apiLogin(
  user: Pick<User, "email" | "password">,
  page: Page,
) {
  const csrfToken = await page
    .context()
    .request.get("/api/auth/csrf")
    .then((response) => response.json())
    .then((json) => json.csrfToken);

  const data = {
    email: user.email,
    password: user.password,
    callbackURL: absoluteUrl(),
    redirect: "false",
    json: "true",
    csrfToken,
  };
  const res = await page
    .context()
    .request.post("/api/auth/callback/credentials", {
      data,
    });
  return res;
}

const getRandomUserName = () =>
  `user-${Math.random().toString(36).substring(7)}`;

// Don't import hashPassword from app as that ends up importing next-auth and initializing it before NEXTAUTH_URL can be updated during tests.
export function hashPassword(password: string) {
  const hashedPassword = hash(password, 12);
  return hashedPassword;
}

async function createUserInDb(userDto?: Partial<Prisma.UserCreateInput>) {
  const uname = getRandomUserName();

  const data = {
    ...userDto,
    name: userDto?.name || uname,
    email: userDto?.email || `${uname}@example.com`,
    password: hashPassword("example"),
  };

  return await UserRepo.create(data);
}
