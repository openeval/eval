import type { Candidate, UserType } from "@prisma/client";
import type { User } from "next-auth";
import { redirect } from "next/navigation";

import { stripe } from "~/ee/lib/stripe";
import { findOneById } from "~/server/services/Organizations";
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

// we track usage for candidates
export const trackUsage = async (candidate: Candidate) => {
  const org = await findOneById(candidate.organizationId);
  const metadata = organizationMetadataSchema.parse(org?.metadata);
  if (metadata?.subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(
      metadata?.subscriptionId,
    );

    const subscriptionItemId = subscription.items.data.find((d) => {
      return d.price.lookup_key?.includes("metered_candidates");
    });

    // TODO: we need to report issues (sentry)
    // cancel or paused subscriptions can't capture usage
    if (subscriptionItemId) {
      await stripe.subscriptionItems.createUsageRecord(subscriptionItemId?.id, {
        quantity: 1,
        action: "increment",
      });
    }
  }
};
