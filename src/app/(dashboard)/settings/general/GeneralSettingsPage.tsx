"use client";

import type { Organization, OrganizationUpdateInput } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { toast } from "~/hooks/use-toast";
import type { UpdateOrgAction } from "../actions";
import { OrgUpdateForm } from "./OrgUpdateForm";

type GeneralSettingsPageProps = {
  data: { org: NonNullable<Organization> };
  actions: { updateOrgAction: UpdateOrgAction };
};

export const GeneralSettingsPage = ({
  actions,
  data,
}: GeneralSettingsPageProps) => {
  const router = useRouter();

  const [isLoading, startActionTransition] = React.useTransition();

  const onSubmitOrgUpdateForm = (formData: OrganizationUpdateInput) => {
    startActionTransition(async () => {
      const res = await actions.updateOrgAction(data.org.id, formData);

      if (res.success) {
        router.refresh();
        toast({
          title: "Updated.",
        });
      } else {
        toast({
          title: "Something went wrong.",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div>
      <Typography variant={"h1"}>General</Typography>
      <Separator className="my-4" />

      <div className="mt-4">
        <OrgUpdateForm
          onSubmit={onSubmitOrgUpdateForm}
          isLoading={isLoading}
          defaultValues={data.org}
        />
      </div>
    </div>
  );
};
