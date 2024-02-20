import { UserSchema } from "prisma/zod";
import type { z } from "zod";

export const ProfileDtoSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
});

export type ProfileDto = z.infer<typeof ProfileDtoSchema>;
