import { MembershipRole, type Prisma } from "@prisma/client";
import type { User } from "next-auth";
import slugify from "slugify";

import { prisma } from "~/server/db";
import { update as updateUser } from "./User";

export async function update(where, data) {
  return await prisma.organization.update({ where, data });
}

export async function create(
  data: Prisma.OrganizationCreateInput,
  owner: User,
) {
  const org = await prisma.organization.create({
    data: {
      ...data,
      slug: slugify(data.name),
      members: {
        create: {
          user: { connect: { id: owner.id } },
          role: MembershipRole.OWNER,
          accepted: true,
        },
      },
    },
  });

  await updateUser(
    { id: owner.id },
    { activeOrg: { connect: { id: org.id } }, completedOnboarding: true },
  );

  return org;
}

export async function findOneById(id) {
  return await prisma.organization.findFirst({ where: { id } });
}
