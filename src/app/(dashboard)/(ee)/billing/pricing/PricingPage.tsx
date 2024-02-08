"use client";

import { CheckCircle2 } from "lucide-react";
import React, { useState, useTransition } from "react";

import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import { Typography } from "~/components/ui/Typography";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

type PricingCardProps = {
  billingPeriod?: "yearly" | "monthly";
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
  currency?: string;
  isLoadingAction: boolean;
  type: string;
  action: () => void;
  quantity?: number;
};

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs defaultValue="yearly" className="mx-auto w-40" onValueChange={onSwitch}>
    <TabsList className="px-2 py-6">
      <TabsTrigger value="monthly" className="text-base">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="yearly" className="text-base">
        Yearly
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

const PricingCard = ({
  type,
  billingPeriod,
  title,
  monthlyPrice = 1,
  yearlyPrice = 1,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
  currency,
  action,
  isLoadingAction,
  quantity = 1,
}: PricingCardProps) => {
  const activePrice = billingPeriod === "yearly" ? yearlyPrice : monthlyPrice;
  const isYearly = billingPeriod === "yearly";
  const totalPrice =
    isYearly && yearlyPrice ? yearlyPrice * 12 : monthlyPrice * quantity * 1;

  return (
    <Card
      className={cn(
        `flex w-72 flex-col justify-between py-1 ${popular ? "border-primary" : "border-muted"} mx-auto sm:mx-0`,
        {
          "animate-background-shine bg-white bg-[length:200%_100%] transition-colors dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]":
            exclusive,
        },
      )}
    >
      <div>
        <CardHeader className="min-h-64 pb-8 pt-4">
          <div className="flex min-h-10 justify-between">
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            {isYearly && type === "price" && (
              <div
                className={cn("h-fit rounded-xl px-2.5 py-1 text-sm", {
                  "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ":
                    true,
                })}
              >
                Save ${(monthlyPrice - yearlyPrice) * 12}
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center gap-0.5">
            {type === "custom" && (
              <h3 className="mr-2 text-5xl font-bold">Custom</h3>
            )}

            {type === "price" && (
              <>
                <h3 className="mr-2 text-4xl font-bold">
                  {currency} {activePrice}
                </h3>
                <span className="mb-1 flex flex-col justify-end text-sm">
                  <span>
                    /per <br />
                    month
                  </span>
                </span>
              </>
            )}
          </div>

          <CardDescription className="h-12 pt-1.5">
            {type === "price" && isYearly && (
              <span>
                {currency}
                <strong>{totalPrice}</strong> billed {billingPeriod}
              </span>
            )}
          </CardDescription>

          <CardDescription className="h-12 pt-1.5">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <>
            {features.map((feature: string) => (
              <CheckItem key={feature} text={feature} />
            ))}
          </>
        </CardContent>
      </div>
      <CardFooter className="mt-2">
        <Button
          data-testid={`${title}-pricing-card-button`}
          disabled={isLoadingAction}
          onClick={action}
          className="relative inline-flex w-full items-center justify-center rounded-md bg-black px-6 font-medium text-white transition-colors  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-white dark:text-black"
        >
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
  </div>
);

export default function PricingPage({ planAction }) {
  const [billingPeriod, setBillingPeriod] = useState<"yearly" | "monthly">(
    "yearly",
  );
  const [isLoadingAction, startActionTransition] = useTransition();
  const togglePricingPeriod = (value) => setBillingPeriod(value);

  enum CurrencySymbols {
    USD = "$",
    EUR = "€",
  }

  const plans = [
    {
      type: "price",
      title: "Basic",
      lookup_key: "basic", //"standar_yearly"
      monthlyPrice: 30,
      yearlyPrice: 24,
      quantity: 3,
      currency: CurrencySymbols.USD,
      description: "Best for starters.",
      features: [
        "3 Verified Candidates *",
        "Unlimited Seats",
        "Unlimited Assessments",
        "Basic support",
      ],
      popular: false,
      actionLabel: "Start trial",
      action: async (plan) => {
        startActionTransition(async () => {
          const priceKey = `${plan.lookup_key}_${billingPeriod}`;
          await planAction(priceKey);
        });
      },
    },
    {
      type: "price",
      title: "Standard",
      lookup_key: "standard", //"standar_yearly"
      monthlyPrice: 150,
      yearlyPrice: 120,
      quantity: 15,
      currency: CurrencySymbols.USD,
      description: "Best for growing organization.",
      features: [
        "15 Verified Candidates *",
        "Unlimited Seats",
        "Unlimited Assessments",
        "Basic support",
      ],
      popular: true,
      actionLabel: "Start trial",
      action: async (plan) => {
        startActionTransition(async () => {
          const priceKey = `${plan.lookup_key}_${billingPeriod}`;
          await planAction(priceKey);
        });
      },
    },
    {
      type: "price",
      title: "Plus",
      currency: CurrencySymbols.USD,
      monthlyPrice: 450,
      yearlyPrice: 360,
      quantity: 45,
      description: "Best for teams and large organizations.",
      features: [
        "45 Verified Candidates *",
        "Unlimited Seats",
        "Unlimited Assessments",
        "Premium support",
      ],
      exclusive: true,
      actionLabel: "Start trial",
      action: async (plan) => {
        startActionTransition(async () => {
          const priceKey = `${plan.lookup_key}_${billingPeriod}`;
          await planAction(priceKey);
        });
      },
    },
  ];
  return (
    <div data-testid="pricing-page" className="">
      <section className="mb-8 text-center">
        <Typography variant={"h1"} className="mb-4 uppercase">
          Pricing
        </Typography>

        <Typography variant={"lead"}>Unlock all features.</Typography>
        <br />
        <Typography variant={"subtle"}>
          14 days free trial, no credit card needed.
        </Typography>
      </section>

      <PricingSwitch onSwitch={togglePricingPeriod} />
      <section className="container mb-4 mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {plans.map((plan) => {
          return (
            <PricingCard
              key={plan.title}
              {...plan}
              action={() => plan.action(plan)}
              billingPeriod={billingPeriod}
              isLoadingAction={isLoadingAction}
            />
          );
        })}
        <Typography variant={"muted"}>
          * $10 for each extra Verfied Candidate
        </Typography>
      </section>

      <section className="container mt-8">
        <Card>
          <CardHeader>Need more Verified Candidates ?</CardHeader>
          <CardContent>
            <CardDescription>
              Contact us for volume discounts, custom implementations or just to
              say hi!.
            </CardDescription>
            <div className="mt-8">
              <Button
                onClick={() =>
                  window.location.replace(
                    `mailto:${siteConfig.contactUsEmail}?subject=Enterprise plan`,
                  )
                }
                variant={"secondary"}
              >
                Contact us
              </Button>{" "}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
