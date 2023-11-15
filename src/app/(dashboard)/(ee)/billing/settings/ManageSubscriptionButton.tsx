"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "~/components/ui/Button";
import { createStripeBillingPortalSessionAction } from "../actions";

export default function ManageSubscriptionButton() {
  const router = useRouter();

  const [isLoading, startActionTransition] = React.useTransition();

  const redirectToCustomerPortal = async () => {
    startActionTransition(async () => {
      const res = await createStripeBillingPortalSessionAction();
      if (res.success) {
        router.push(res.data as string);
      }
    });
  };

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <Button disabled={isLoading} onClick={redirectToCustomerPortal}>
        Open customer portal
      </Button>
    </div>
  );
}
