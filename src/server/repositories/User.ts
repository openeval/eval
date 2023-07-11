import { prisma } from "~/server/db";
import { type User } from "@prisma/client";

export async function update(where, data) {
  return await prisma.user.update({ where, data });
}
