import { UserType } from "@prisma/client";
import type { User } from "next-auth";
import { redirect } from "next/navigation";

import { env } from "~/ee/env.mjs";
import { createSubscriptionSessionLink, stripe } from "~/ee/lib/stripe";
import { countOrgMembers } from "~/server/services/Membership";

// Check if user has an active subscription
export const checkSubscription = async (user: User) => {
  // only users that completed onboarding
  if (user.type === UserType.RECRUITER && user.completedOnboarding) {
    if (!user.activeOrg.metadata?.subscriptionId) {
      const subscriptionLink = await createSubscriptionSessionLink(
        user.activeOrg.id,
        user.email,
      );
      if (subscriptionLink) {
        redirect(subscriptionLink);
      }
    }
  }
};

export const updateSubscriptionSeats = async (org) => {
  if (!org.metadata?.subscriptionId) {
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(
    org.metadata?.subscriptionId,
  );

  const subscriptionItem = subscription.items.data.find(
    (sub) => sub.price.id === env.STRIPE_BASIC_MONTHLY_PRICE_ID,
  );

  const membershipCount = await countOrgMembers(org.id);
  if (subscriptionItem && membershipCount !== subscriptionItem.quantity) {
    await stripe.subscriptions.update(org.metadata?.subscriptionId, {
      items: [{ quantity: membershipCount, id: subscriptionItem?.id }],
    });
  }
};
