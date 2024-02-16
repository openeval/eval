import { AssessmentSchema } from "prisma/zod";
import { z } from "zod";

export const CreateAssessmentDtoSchema = AssessmentSchema.pick({
  title: true,
  description: true,
});

export type CreateAssessmentDto = z.infer<typeof CreateAssessmentDtoSchema>;
