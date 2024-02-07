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
  isYearly?: boolean;
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
  <Tabs defaultValue="1" className="mx-auto w-40" onValueChange={onSwitch}>
    <TabsList className="px-2 py-6">
      <TabsTrigger value="0" className="text-base">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="1" className="text-base">
        Yearly
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

const PricingCard = ({
  type,
  isYearly,
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
  const activePrice = isYearly ? yearlyPrice : monthlyPrice;
  const totalPrice =
    isYearly && yearlyPrice
      ? yearlyPrice * quantity * 12
      : monthlyPrice * quantity * 1;

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
                    popular,
                })}
              >
                Save ${(monthlyPrice - yearlyPrice) * 12 * quantity}
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center gap-0.5">
            {type === "custom" && (
              <h3 className="mr-2 text-5xl font-bold">Custom</h3>
            )}

            {type === "price" && (
              <>
                <h3 className="mr-2 text-5xl font-bold">
                  {currency} {activePrice}
                </h3>
                <span className="mb-1 flex flex-col justify-end text-sm">
                  <span>
                    /per <br />
                    Verified Candidate
                  </span>
                </span>
              </>
            )}
          </div>

          <CardDescription className="h-12 pt-1.5">
            {currency && (
              <span>
                {currency}
                <strong>{totalPrice}</strong> billed{" "}
                {isYearly ? "yearly" : "monthly"}
              </span>
            )}
          </CardDescription>

          <CardDescription className="h-12 pt-1.5">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <>
            {type === "price" && (
              <CheckItem
                text={`${isYearly ? quantity * 12 : quantity} Verified Candidates`}
              />
            )}

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
  const [isYearly, setIsYearly] = useState(true);
  const [isLoadingAction, startActionTransition] = useTransition();
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);

  enum CurrencySymbols {
    USD = "$",
    EUR = "€",
  }

  const plans = [
    {
      type: "price",
      title: "Standard",
      monthlyPrice: 8,
      yearlyPrice: 6,
      quantity: 10,
      currency: CurrencySymbols.USD,
      description: "Unlock all features you need to get started",
      features: ["Unlimited Seats", "Unlimited Assessments", "Basic support"],
      popular: true,
      actionLabel: "Start trial",
      action: async (_plan) => {
        startActionTransition(async () => {
          await planAction(isYearly ? "year" : "month");
        });
      },
    },
    {
      type: "custom",
      title: "Enterprise",
      price: "Custom",
      description: "Dedicated support and custom solution to fit your needs.",
      features: [
        "Premium support",
        "Advanced integrations",
        "Volume discounts",
        "Workshops",
      ],
      actionLabel: "Contact us",
      exclusive: true,
      action: (_plan) => {
        window.location.replace(
          `mailto:${siteConfig.contactUsEmail}?subject=Enterprise plan`,
        );
      },
    },
  ];
  return (
    <div data-testid="pricing-page" className="">
      <section className="mb-8 text-center">
        <Typography variant={"h1"} className="mb-4 uppercase">
          Pricing
        </Typography>

        <Typography variant={"lead"}>
          Unlock all features. Pay as you go only for Verified Candidates.
        </Typography>
        <br />
        <Typography variant={"subtle"}>
          14 days free trial, no credit card needed.
        </Typography>
      </section>

      <PricingSwitch onSwitch={togglePricingPeriod} />
      <section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {plans.map((plan) => {
          return (
            <PricingCard
              key={plan.title}
              {...plan}
              action={() => plan.action(plan)}
              isYearly={isYearly}
              isLoadingAction={isLoadingAction}
            />
          );
        })}
      </section>
    </div>
  );
}
