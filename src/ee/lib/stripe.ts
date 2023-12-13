import Stripe from "stripe";

import { env } from "~/ee/env.mjs";
import { absoluteUrl } from "~/lib/utils";

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

export const createSubscriptionSessionLink = async (orgId, email) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    success_url: `${absoluteUrl()}/assessments`, //set it with props
    cancel_url: `${absoluteUrl()}/`,
    customer_email: email,
    client_reference_id: orgId,
    line_items: [
      {
        price: env.STRIPE_BASIC_MONTHLY_PRICE_ID,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 99,
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_settings: {
        end_behavior: {
          missing_payment_method: "pause",
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
