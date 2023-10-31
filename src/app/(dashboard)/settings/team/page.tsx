import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { findAllMembershipsByOrgId } from "~/server/repositories/Membership";
import { findOneById as findOrg } from "~/server/repositories/Organizations";
import { TeamSettingsPage } from "./TeamSettingsPage";

export const metadata = {
  title: "Settings",
};

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const org = await findOrg(user.activeOrgId);

  if (!org) {
    notFound();
  }
  const memberships = await findAllMembershipsByOrgId(org.id);

  return <TeamSettingsPage data={{ memberships: memberships }} />;
}
