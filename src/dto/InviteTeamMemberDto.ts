import { z } from "zod";

const InviteTeamMemberSchema = z.object({
  name: z.string().optional(),
  role: z.string(),
  email: z.string().email(),
});

export { InviteTeamMemberSchema };
