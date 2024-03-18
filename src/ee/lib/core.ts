import { UserType, type Organization } from "@prisma/client";
import { type User } from "next-auth";
import { redirect } from "next/navigation";

import { stripe } from "~/ee/lib/stripe";
import * as orgService from "~/server/services/Organizations";
import { organizationMetadataSchema } from "../types/Organization";

// Check if user has an active subscription
export const checkSubscription = async (user: User) => {
  // only users that completed onboarding
  if (user.type === UserType.RECRUITER && user.completedOnboarding) {
    const metadata = organizationMetadataSchema.parse(user.activeOrg.metadata);

    if (!metadata?.subscriptionId) {
      redirect("/onboarding/plan");
    }
  }
};

export const createCustomer = async (org: Organization) => {
  const customer = await stripe.customers.create({
    name: org.name as string,
    email: org.email as string,
  });

  const metadata = organizationMetadataSchema.parse(org?.metadata);
  await orgService.update(
    { id: org.id },
    { metadata: { ...metadata, stripeCustomerId: customer.id } },
  );
};
