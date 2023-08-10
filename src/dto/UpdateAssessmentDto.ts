import { z } from "zod";

const UpdateAssessmentDto = z.object({
  evaluationPeriodDays: z.string().optional(),
  published: z.boolean().optional(),
});

export { UpdateAssessmentDto };
