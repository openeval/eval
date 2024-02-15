import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";

import { checkSubscription } from "~/ee/lib/core";
import { env } from "~/env.mjs";
import { getCurrentUser } from "~/server/auth";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  if (!user.completedOnboarding) {
    redirect("/onboarding");
  }

  if (user.type === UserType.APPLICANT) {
    redirect("/d");
  }

  if (user.type === UserType.RECRUITER) {
    if (env.IS_EE) {
      await checkSubscription(user);
    }
    redirect("/assessments");
  }

  return <div>loading...</div>;
}
