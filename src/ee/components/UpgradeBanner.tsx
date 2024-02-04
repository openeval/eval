import { HelpCircle } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { stripe } from "../lib/stripe";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";

export const UpgradeBanner = async ({ activeOrg }) => {
  if (activeOrg.metadata?.subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(
      activeOrg.metadata?.subscriptionId,
    );

    if (subscription && subscription.status === "trialing") {
      return (
        <div className="flex items-center justify-center bg-primary py-1 text-center text-white">
          <Popover>
            <PopoverTrigger>
              <HelpCircle className="mr-2 h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent>
              After your free trial ends this plan will continue automatically.
            </PopoverContent>
          </Popover>
          You are on a free trial.{" "}
          <ManageSubscriptionButton
            variant="link"
            className="text-md text-white underline"
          >
            Check it here
          </ManageSubscriptionButton>
        </div>
      );
    }
  }

  return <></>;
};
