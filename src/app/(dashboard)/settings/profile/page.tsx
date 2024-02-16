import { subject } from "@casl/ability";
import { notFound, redirect } from "next/navigation";

import { getCurrentUser, isAuthorized } from "~/server/auth";
import * as userService from "~/server/services/User";
import { ProfilePage } from "./ProfilePage";

export const metadata = {
  title: "Profile",
};

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await userService.findOneById(user.id!, {
    id: true,
    name: true,
    email: true,
  });

  if (!profile) {
    notFound();
  }

  if (!isAuthorized(user, "manage", subject("Profile", profile))) {
    redirect("/404");
  }

  return <ProfilePage data={{ profile }} />;
}
