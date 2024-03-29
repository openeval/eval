"use server";

import { type User } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

import { stripe } from "~/ee/lib/stripe";
import { organizationMetadataSchema } from "~/ee/types/Organization";
import { absoluteUrl } from "~/lib/utils";
import { getServerSession } from "~/server/auth";
import { ERROR_CODES, ErrorResponse } from "~/server/error";
import * as OrgService from "~/server/services/Organizations";
import type { ActionResponse } from "~/types";

// action should be imported in server components and use prop drilling
// to have access to the current user session
// https://clerk.com/docs/nextjs/server-actions#with-client-components

export type CreateStripeCheckoutSessionAction = (data: {
  priceId: string;
}) => Promise<ActionResponse<User>>;

// DEPRECATED
export const createStripeCheckoutSessionAction: CreateStripeCheckoutSessionAction =
  async (data) => {
    const { priceId } = data;

    const session = await getServerSession();

    if (!session) {
      redirect("/login");
    }

    const price = await stripe.prices.retrieve(priceId);

    try {
      // we need to have customer, who is it in the model

      // 4. Create a checkout session in Stripe
      let session;
      if (price.type === "recurring") {
        session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          billing_address_collection: "required",
          //   customer,
          //   customer_update: {
          //     address: "auto",
          //   },
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          mode: "subscription",
          allow_promotion_codes: true,
          //   subscription_data: {
          //     metadata,
          //   },
          success_url: `${absoluteUrl()}/`, //set it with props
          cancel_url: `${absoluteUrl()}/`,
        });
      }

      return { success: true, data: session };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return ErrorResponse(
          "Incorrect format",
          ERROR_CODES.BAD_REQUEST,
          error.issues,
        );
      }

      return ErrorResponse(error?.message);
    }
  };

export async function createStripeBillingPortalSessionAction(): Promise<
  ActionResponse<string>
> {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  const org = await OrgService.findOneById(user.activeOrgId);

  if (!org) {
    notFound();
  }

  try {
    const metadata = organizationMetadataSchema.parse(org.metadata);

    if (!metadata?.stripeCustomerId) {
      throw Error("organization without stripe customer");
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer: metadata?.stripeCustomerId,
      return_url: `${absoluteUrl()}/billing/settings`,
    });

    return { success: true, data: url };
  } catch (error) {
    return ErrorResponse(error?.message);
  }
}
