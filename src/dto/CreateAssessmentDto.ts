import type { z } from "zod";
import {
  AssessmentCreateInputSchema,
  AssessmentUpdateInputSchema,
} from "prisma/zod";

export const CreateAssessmentDto = AssessmentUpdateInputSchema.omit({
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  organizationId: true,
  published: true,
  status: true,
});

export type CreateAssessment = z.infer<typeof CreateAssessmentDto>;
