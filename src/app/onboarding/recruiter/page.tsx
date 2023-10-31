import { redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { createOrgAction } from "../actions";
import { CreateOrganizationForm } from "./CreateOrganizationForm";

//we get callback,  can we pass params ?
export default async function Onboarding() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  if (user.completedOnboarding && user.activeOrgId) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-md">
      <CreateOrganizationForm action={createOrgAction} />
    </div>
  );
}
