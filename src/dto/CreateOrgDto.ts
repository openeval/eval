import type { z } from "zod";
import { OrganizationSchema } from "prisma/zod";

export const CreateAssessmentDto = OrganizationSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type Organization = z.infer<typeof OrganizationSchema>;
