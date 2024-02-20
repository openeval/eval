import type { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

// 2
beforeEach(() => {
  mockReset(prisma);
});

// 3
export const prisma = mockDeep<PrismaClient>();
export default prisma;
