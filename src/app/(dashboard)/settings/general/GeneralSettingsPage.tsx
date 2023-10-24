"use client";

import type { Organization } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { OrganizationUpdateInput } from "prisma/zod";
import * as React from "react";

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
    <div className="mx-auto max-w-2xl">
      <OrgUpdateForm
        onSubmit={onSubmitOrgUpdateForm}
        isLoading={isLoading}
        defaultValues={data.org}
      />
    </div>
  );
};
