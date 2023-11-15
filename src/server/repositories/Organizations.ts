import "server-only";

import { MembershipRole, type Prisma } from "@prisma/client";
import type { User } from "next-auth";
import slugify from "slugify";

import { prisma } from "~/server/db";

export async function update(where, data) {
  return await prisma.organization.update({ where, data });
}

export async function create(
  data: Prisma.OrganizationCreateInput,
  owner: User,
) {
  return await prisma.organization.create({
    data: {
      ...data,
      slug: slugify(data.name),
      members: {
        create: {
          userId: owner.id,
          role: MembershipRole.OWNER,
          accepted: true,
        },
      },
    },
  });
}

export async function findOneById(id) {
  return await prisma.organization.findFirst({ where: { id } });
}

// //metadata
// // {billing:{
// paymentId: z.string(),
// subscriptionId: z.string().nullable(),
// subscriptionItemId: z.string().nullable(),
// stripeCustomerId
//   customerId:adsad
//   subscriptionId:asdasd
// }}
