import { redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
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

  return (
    <ProfilePage data={{ user: user }} actions={{ updateProfileAction }} />
  );
}
