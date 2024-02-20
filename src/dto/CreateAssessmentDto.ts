import { AssessmentSchema } from "prisma/zod";
import { z } from "zod";

export const CreateAssessmentInputDtoSchema = AssessmentSchema.pick({
  title: true,
  description: true,
});

export type CreateAssessmentInputDto = z.infer<
  typeof CreateAssessmentInputDtoSchema
>;

export const CreateAssessmentDtoSchema = AssessmentSchema.pick({
  title: true,
  description: true,
  organizationId: true,
  createdById: true,
});

export type CreateAssessmentDto = z.infer<typeof CreateAssessmentDtoSchema>;
