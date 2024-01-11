import { z } from "zod";

const InviteCandidateSchema = z.object({
  assessmentId: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export type InviteCandidateType = z.infer<typeof InviteCandidateSchema>;

export { InviteCandidateSchema };
