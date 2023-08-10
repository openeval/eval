import { CreateOrganizationForm } from "./CreateOrganizationForm";

import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createOrgAction } from "../actions";

//we get callback,  can we pass params ?
export default async function Onboarding() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  if (user.completedOnboarding) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-md">
      <CreateOrganizationForm action={createOrgAction} />
    </div>
  );
}
