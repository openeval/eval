import { notFound, redirect } from "next/navigation";

import { getCurrentUser, isAuthorized } from "~/server/auth";
import { findAllMembershipsByOrgId } from "~/server/services/Membership";
import { findOneById as findOrg } from "~/server/services/Organizations";
import { TeamSettingsPage } from "./TeamSettingsPage";

export const metadata = {
  title: "Settings",
};

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAuthorized(user, "read", "Member")) {
    redirect("/404");
  }

  const org = await findOrg(user.activeOrgId);

  if (!org) {
    notFound();
  }
  const memberships = await findAllMembershipsByOrgId(org.id);

  return <TeamSettingsPage data={{ memberships: memberships }} />;
}
