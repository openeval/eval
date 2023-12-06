import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  if (!user.completedOnboarding) {
    redirect("/onboarding");
  }

  if (user.type === UserType.CANDIDATE) {
    redirect("/d");
  }

  if (user.type !== UserType.RECRUITER) {
    redirect("/assessments");
  }

  return <div></div>;
}
