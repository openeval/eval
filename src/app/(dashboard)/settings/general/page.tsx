import { notFound, redirect } from "next/navigation";

import { getCurrentUser, isAuthorized } from "~/server/auth";
import { findOneById as findOrg } from "~/server/services/Organizations";
import { updateOrgAction } from "../actions";
import { GeneralSettingsPage } from "./GeneralSettingsPage";

export const metadata = {
  title: "Settings",
};

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAuthorized(user, "read", "Organization")) {
    redirect("/404");
  }

  const org = await findOrg(user.activeOrgId);

  if (!org) {
    notFound();
  }

  return (
    <GeneralSettingsPage data={{ org: org }} actions={{ updateOrgAction }} />
  );
}
