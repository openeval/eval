import z from "zod";

export const organizationMetadataSchema = z
  .object({
    subscriptionId: z.string().nullable(),
    stripeCustomerId: z.string().nullable(),
  })
  .partial()
  .nullable();

export type OrganizationMetadata = z.infer<typeof organizationMetadataSchema>;
