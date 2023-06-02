import { z } from "zod";

const InviteCandidateSchema = z.object({
  assessmentId: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export { InviteCandidateSchema };
