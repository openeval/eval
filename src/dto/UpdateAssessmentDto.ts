import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { AssessmentUpdateInputSchema } from "prisma/zod";

export const UpdateAssessmentDto = AssessmentUpdateInputSchema;

export type UpdateAssessmentDtoType = z.infer<
  typeof Prisma.AssessmentUpdateInput
>;
