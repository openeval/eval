import { redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { createStripeBillingPortalSessionAction } from "./actions";
import PricingTable from "./pricing/page";

export const metadata = {
  title: "Pricing",
};

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const res = await createStripeBillingPortalSessionAction();

  if (res.success) {
    redirect(res.data as string);
  }

  return <PricingTable />;
}
