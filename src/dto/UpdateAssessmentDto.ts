import { z } from "zod";

export const UpdateAssessmentDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export type UpdateAssessmentDtoType = z.infer<typeof UpdateAssessmentDto>;
