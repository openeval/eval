import { notFound, redirect } from "next/navigation";
import Script from "next/script";

import { env } from "~/ee/env.mjs";
import { getCurrentUser } from "~/server/auth";
import { findOneById as findOrg } from "~/server/services/Organizations";

// TODO: deprecated
export default async function PricingTable() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const org = await findOrg(user.activeOrgId);

  if (!org) {
    notFound();
  }

  return (
    <>
      <Script src="https://js.stripe.com/v3/pricing-table.js"></Script>
      {/* @ts-expect-error stripe issues */}
      <stripe-pricing-table
        pricing-table-id={env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
        publishable-key={env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        client-reference-id={org.id}
        customer-email={user.email}
      />
    </>
  );
}
