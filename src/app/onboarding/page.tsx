import { CandidateStatus, UserType } from "@prisma/client";
import { redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { findCandidateByUserId } from "~/server/repositories/Candidates";
import { updateUserTypeAction } from "./actions";
import { UserTypeForm } from "./UserTypeForm";

export default async function Onboarding({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.completedOnboarding && user.activeOrgId) {
    redirect("/");
  }

  if (user.type === UserType.CANDIDATE) {
    const candidate = await findCandidateByUserId(user.id);

    if (!candidate) {
      redirect(
        `/onboarding/candidate${
          searchParams.callbackUrl && "?callbackUrl=" + searchParams.callbackUrl
        }`,
      );
    }

    if (candidate?.status !== CandidateStatus.VERIFIED) {
      redirect(
        `/onboarding/candidate?step=github-connect${
          (searchParams.callbackUrl &&
            "&callbackUrl=" + searchParams.callbackUrl) ||
          ""
        }`,
      );
    }
  }

  return (
    <div>
      <UserTypeForm action={updateUserTypeAction} />
    </div>
  );
}
