"use client";

import type { User, UserUpdateInput } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { toast } from "~/hooks/use-toast";
import type { UpdateProfileAction } from "./actions";
import { ProfileForm } from "./ProfileForm";

type ProfilePageProps = {
  data: { user: User };
  actions: { updateProfileAction: UpdateProfileAction };
};

export const ProfilePage = ({ actions, data }: ProfilePageProps) => {
  const router = useRouter();

  const [isLoading, startActionTransition] = React.useTransition();

  const onSubmitProfileUpdateForm = (formData: UserUpdateInput) => {
    startActionTransition(async () => {
      const res = await actions.updateProfileAction(data.user.id, formData);

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
      <Typography variant={"h1"}>My Profile</Typography>
      <Separator className="my-4" />

      <div className="mt-4">
        <ProfileForm
          onSubmit={onSubmitProfileUpdateForm}
          isLoading={isLoading}
          defaultValues={data.user}
        />
      </div>
    </div>
  );
};
