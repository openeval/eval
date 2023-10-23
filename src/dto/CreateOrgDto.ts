import { OrganizationSchema } from "prisma/zod";
import type { z } from "zod";

export const CreateAssessmentDto = OrganizationSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type Organization = z.infer<typeof OrganizationSchema>;
