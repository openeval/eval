import { CreateOrganizationForm } from "~/components/CreateOrganizationForm";

import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { env } from "~/env.mjs";

//we get callback,  can we pass params ?
export default async function Onboarding() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  if (user.completedOnboarding) {
    redirect("/");
  }

  const cookieStore = cookies();
  //is a candidate comming from an assessment
  const onboadingFlow = cookieStore.get("onboardingFlow");

  if (onboadingFlow) {
  }

  return (
    <div>
      <CreateOrganizationForm />
    </div>
  );
}
