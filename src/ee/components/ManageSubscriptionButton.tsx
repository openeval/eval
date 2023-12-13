"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "~/components/ui/Button";
import { createStripeBillingPortalSessionAction } from "../actions/billing";

export function ManageSubscriptionButton({ ...props }) {
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
    <Button
      {...props}
      disabled={isLoading}
      onClick={redirectToCustomerPortal}
    />
  );
}
