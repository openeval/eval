import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserTypeForm } from "./UserTypeForm";
import { updateUserType } from "./actions";
import { CandidateStatus, UserType } from "@prisma/client";
import { findCandidateByUserId } from "~/server/repositories/Candidates";

//we get callback,  can we pass params ?
export default async function Onboarding({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.completedOnboarding) {
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

  const cookieStore = cookies();
  //is a candidate comming from an assessment
  const onboadingFlow = cookieStore.get("onboardingFlow");

  return (
    <div>
      <UserTypeForm action={updateUserType} />
    </div>
  );
}
