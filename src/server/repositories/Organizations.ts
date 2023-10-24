import "server-only";

import type { Prisma } from "@prisma/client";

import { prisma } from "~/server/db";

export async function update(where, data) {
  return await prisma.organization.update({ where, data });
}

export async function findOneById(id) {
  return await prisma.organization.findFirst({ where: { id } });
}
