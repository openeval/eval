import type Prisma from "@prisma/client";

import { prisma } from "~/server/db";

export async function findOneById(id: string, organizationId?) {
  return await prisma.membership.findFirst({
    where: { id, organizationId },
  });
}

export async function findAllMembershipsByOrgId(organizationId: string) {
  return await prisma.membership.findMany({
    include: { user: true },
    where: { organizationId },
    orderBy: { createdAt: "desc" },
  });
}

export async function remove(id: string) {
  return await prisma.membership.delete({
    where: { id },
  });
}

export async function update(
  where: Prisma.MembershipWhereInput,
  data: Prisma.MembershipUpdateInput,
) {
  return await prisma.membership.update({ where, data });
}
