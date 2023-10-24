"use client";

import type { Organization } from "@prisma/client";
import { useRouter } from "next/navigation";

import { toast } from "~/hooks/use-toast";
import { OrgUpdateForm } from "./OrgUpdateForm";

type GeneralSettingsPageProps = {
  data: { org: NonNullable<Organization> };
  actions: {
    updateOrgAction: (id: string, data) => Promise<Organization | null>;
  };
};

export const GeneralSettingsPage = ({
  actions,
  data,
}: GeneralSettingsPageProps) => {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-2xl">
      <OrgUpdateForm
        onSuccess={() => {
          router.refresh();
          toast({
            title: "Updated.",
          });
        }}
        org={data.org}
        action={actions.updateOrgAction}
      />
    </div>
  );
};
