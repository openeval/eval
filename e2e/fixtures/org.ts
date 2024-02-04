import { type Page } from "@playwright/test";
import type { Organization, Prisma, User } from "@prisma/client";

import * as ee from "~/ee/lib/core";
import { stripe } from "~/ee/lib/stripe";
import { prisma } from "~/server/db";
import * as orgService from "~/server/services/Organizations";

const getRandomSlug = () => `org-${Math.random().toString(36).substring(7)}`;

type CreateOrgProps = Partial<Prisma.OrganizationCreateInput> & {
  owner: User;
};
// creates a user fixture instance and stores the collection
export const createOrgsFixture = (page: Page) => {
  const store: { orgs: Organization[]; page: Page } = { orgs: [], page };
  return {
    create: async (opts: CreateOrgProps) => {
      const org = await createOrgInDb(
        {
          name: opts.name || getRandomSlug(),
          slug: opts.slug || getRandomSlug(),
          // todo: pass as option
          metadata: {
            subscriptionId: "sub_1OWxfeKnIh8U839cbbrda4Qx",
            stripeCustomerId: "cus_PLezfqHjUo7fUl",
          },
        },
        opts.owner,
      );

      createCustumer(org);

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

async function createOrgInDb(data, owner) {
  return await orgService.create(data, owner);
}

async function createCustumer(org) {
  return await ee.createCustomer(org);
}
