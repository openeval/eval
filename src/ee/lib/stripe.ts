import type { Organization } from "@prisma/client";
import Stripe from "stripe";

import { env } from "~/ee/env.mjs";
import { absoluteUrl } from "~/lib/utils";
import { ServiceError } from "~/server/error";
import { organizationMetadataSchema } from "../types/Organization";

const products = [
  {
    name: "lite",
    prices: [
      {
        interval: "yearly",
        lookup_key: "lite_yearly",
      },
      {
        interval: "monthly",
        lookup_key: "lite_monthly",
      },
    ],
  },
];
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
  priceKey: string;
};
export const createSubscriptionSessionLink = async ({
  org,
  priceKey,
}: SubscriptionOpts) => {
  const orgMetadata = organizationMetadataSchema.parse(org.metadata);

  const prices = await stripe.prices.list({
    lookup_keys: [priceKey],
  });

  const price = prices.data.find(
    (price) => price.lookup_key === priceKey && price.active,
  );

  if (!price) {
    throw new ServiceError(`price not found with key: ${priceKey}`);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    success_url: `${absoluteUrl()}/dashboard`, //set it with props
    cancel_url: `${absoluteUrl()}/`,
    customer: orgMetadata?.stripeCustomerId as string,
    client_reference_id: org.id,
    line_items: [
      {
        price: price.id,
        quantity: 1,
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
