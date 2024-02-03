"use client";

import Link from "next/link";
import * as React from "react";

import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { ManageSubscriptionButton } from "~/ee/components/ManageSubscriptionButton";

type BillingSettingsPageProps = {
  data: {
    currentPlan?: {
      price: string;
      interval: string;
      name: string;
      status: string;
      quantity: number;
    };
  };
};

export const BillingSettingsPage = ({ data }: BillingSettingsPageProps) => {
  return (
    <div>
      <Typography variant={"h1"}>Your plan</Typography>
      <Separator className="my-4" />

      <div className="mt-4">
        <Card>
          <CardHeader className="flex-row justify-between">
            <CardTitle>{data.currentPlan?.name || "Free"}</CardTitle>
            <Badge variant={"outline"}>{data.currentPlan?.status}</Badge>
          </CardHeader>

          {/* <CardContent className="grid gap-6">
            {data.currentPlan && (
              <div>
                {data.currentPlan.quantity} x {data.currentPlan.price}/
                {data.currentPlan.interval}
              </div>
            )}
          </CardContent> */}
          <CardFooter className="justify-end">
            {data.currentPlan && data.currentPlan.status !== "canceled" && (
              <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <ManageSubscriptionButton>
                  Open customer postal
                </ManageSubscriptionButton>
              </div>
            )}
            {!data.currentPlan ||
              (data.currentPlan.status === "canceled" && (
                <Button asChild>
                  <Link href={"/billing/pricing"}>Pricing</Link>
                </Button>
              ))}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
