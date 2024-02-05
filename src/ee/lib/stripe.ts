import type { Organization } from "@prisma/client";
import Stripe from "stripe";

import { env } from "~/ee/env.mjs";
import { absoluteUrl } from "~/lib/utils";
import { organizationMetadataSchema } from "../types/Organization";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? "", {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-10-16",
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  // appInfo: {
  //   name: "Next.js Subscription Starter",
  //   version: "0.1.0",
  // },
});

type SubscriptionOpts = {
  org: Organization;
  interval: string;
};
export const createSubscriptionSessionLink = async ({
  org,
  interval,
}: SubscriptionOpts) => {
  const orgMetadata = organizationMetadataSchema.parse(org.metadata);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    success_url: `${absoluteUrl()}/assessments`, //set it with props
    cancel_url: `${absoluteUrl()}/`,
    customer: orgMetadata?.stripeCustomerId as string,
    client_reference_id: org.id,
    line_items: [
      {
        price:
          interval === "year"
            ? process.env.STRIPE_PRICE_STANDARD_CANDIDATES_METERED_YEARLY_ID
            : process.env.STRIPE_PRICE_STANDARD_CANDIDATES_METERED_MONTHLY_ID,
      },
    ],
    subscription_data: {
      trial_settings: {
        end_behavior: {
          missing_payment_method: "cancel",
        },
      },
      trial_period_days: 14,
    },
    allow_promotion_codes: true,
    payment_method_collection: "if_required",
    billing_address_collection: "required",
    // needs stripe account activation
    // automatic_tax: {
    //   enabled: true,
    // },
  });

  return session.url;
};
