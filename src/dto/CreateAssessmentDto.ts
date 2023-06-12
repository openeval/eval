import { z } from "zod";

export const CreateAssessmentDto = z.object({
  title: z.string(),
  description: z.string(),
});

export type CreateAssessmentDtoType = z.infer<typeof CreateAssessmentDto>;
