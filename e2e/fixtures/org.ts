import { type Page } from "@playwright/test";
import type { Organization } from "@prisma/client";

import { prisma } from "~/server/db";

const getRandomSlug = () => `org-${Math.random().toString(36).substring(7)}`;

// creates a user fixture instance and stores the collection
export const createOrgsFixture = (page: Page) => {
  const store: { orgs: Organization[]; page: Page } = { orgs: [], page };
  return {
    create: async (opts: {
      name: string;
      slug?: string;
      requestedSlug?: string;
    }) => {
      const org = await createOrgInDb({
        name: opts.name,
        slug: opts.slug || getRandomSlug(),
      });
      store.orgs.push(org);
      return org;
    },
    get: () => store.orgs,
    deleteAll: async () => {
      await prisma.organization.deleteMany({
        where: { id: { in: store.orgs.map((org) => org.id) } },
      });
      store.orgs = [];
    },
    delete: async (id: string) => {
      await prisma.organization.delete({ where: { id } });
      store.orgs = store.orgs.filter((b) => b.id !== id);
    },
  };
};

async function createOrgInDb({
  name,
  slug,
}: {
  name: string;
  slug: string | null;
}) {
  return await prisma.organization.create({
    data: {
      name: name,
      slug: slug,
      metadata: {},
    },
  });
}
