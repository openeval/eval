import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserTypeForm } from "./UserTypeForm";
import { updateUserType } from "./actions";
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

  return (
    <div>
      <UserTypeForm action={updateUserType} />
    </div>
  );
}
