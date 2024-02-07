import { notFound, redirect } from "next/navigation";

import { stripe } from "~/ee/lib/stripe";
import { organizationMetadataSchema } from "~/ee/types/Organization";
import { getCurrentUser } from "~/server/auth";
import { findOneById as findOrg } from "~/server/services/Organizations";
import { BillingSettingsPage } from "./BillingSettingsPage";

export const metadata = {
  title: "Billing",
};

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const org = await findOrg(user.activeOrgId);

  if (!org) {
    notFound();
  }

  const metadata = organizationMetadataSchema.parse(org.metadata);

  if (!metadata?.subscriptionId) {
    redirect("/billing/pricing");
  }

  const subscription = await stripe.subscriptions.retrieve(
    metadata?.subscriptionId,
  );

  const plan = subscription.items.data[0].plan;

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: plan?.currency,
      minimumFractionDigits: 0,
    }).format((plan?.amount || 0) / 100);

  const productPlan = await stripe.products.retrieve(plan.product as string);

  const currentPlan = {
    price: subscriptionPrice,
    name: productPlan.name,
    interval: plan.interval,
    status: subscription.status,
    quantity: subscription.items.data[0]?.quantity || 0,
  };

  return (
    <BillingSettingsPage
      data={{
        currentPlan,
      }}
    />
  );
}
