import { NextResponse } from "next/server";
import type { Stripe } from "stripe";

import { stripe } from "~/ee/lib/stripe";
import * as OrgService from "~/server/services/Organizations";

export async function POST(req: Request) {
  let event: Stripe.Event;
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
  ];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        // https://stripe.com/docs/payments/checkout/fulfill-orders
        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;

          const org = await OrgService.findOneById(
            checkoutSession.client_reference_id,
          );

          if (!org) {
            throw new Error(
              `organization not found with id: ${checkoutSession.client_reference_id}`,
            );
          }

          if (checkoutSession.mode === "subscription") {
            await OrgService.update(
              { id: org.id },
              {
                metadata: {
                  subscriptionId: checkoutSession.subscription,
                  stripeCustomerId: checkoutSession.customer,
                },
              },
            );
          }

          break;
        case "payment_intent.payment_failed":
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
          break;
        case "payment_intent.succeeded":
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`💰 PaymentIntent status: ${data.status}`);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
          data = event.data.object as Stripe.Subscription;
          console.log(`Subscription status: ${data.status}`);
          break;
        case "customer.subscription.deleted":
          const subscription = event.data.object as Stripe.Subscription;
          // TODO: 500 error
          await OrgService.update(
            { metadata: { path: ["subscriptionId"], equals: subscription.id } },
            {
              metadata: {
                subscriptionId: null,
              },
            },
          );

          console.log(`💰 subscription status: ${subscription.id}`);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 },
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
