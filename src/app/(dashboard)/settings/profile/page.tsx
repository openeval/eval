import { redirect } from "next/navigation";

import { getCurrentUser, isAuthorized } from "~/server/auth";
import { updateProfileAction } from "./actions";
import { ProfilePage } from "./ProfilePage";

export const metadata = {
  title: "Profile",
};

export default async function page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAuthorized(user, "manage", "Profile")) {
    redirect("/404");
  }

  return (
    <ProfilePage data={{ user: user }} actions={{ updateProfileAction }} />
  );
}
