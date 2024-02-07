import { notFound, redirect } from "next/navigation";

import { createSubscriptionSessionLink } from "~/ee/lib/stripe";
import { organizationMetadataSchema } from "~/ee/types/Organization";
import { getCurrentUser } from "~/server/auth";
import { findOneById as findOrg } from "~/server/services/Organizations";
import PricingPage from "./PricingPage";

export const metadata = {
  title: "Pricing",
};

export default async function PricingTable() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const org = await findOrg(user.activeOrgId);

  if (!org) {
    notFound();
  }

  const metadata = organizationMetadataSchema.parse(org.metadata);

  if (metadata?.subscriptionId) {
    redirect("/billing/settings");
  }

  const startStripeCheckoutAction = async (interval) => {
    "use server";

    const url = await createSubscriptionSessionLink({
      org,
      interval,
    });

    if (url) {
      redirect(url);
    }
  };

  return (
    <>
      <PricingPage planAction={startStripeCheckoutAction} />
    </>
  );
}
