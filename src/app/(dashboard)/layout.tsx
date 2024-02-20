import "~/styles/globals.css";

import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";

import { AbilityProvider } from "~/components/AbilityProvider";
import Header from "~/components/Header";
import { SideNav } from "~/components/SideNav";
import { siteConfig } from "~/config/site";
import { UpgradeBanner } from "~/ee/components/UpgradeBanner";
import { checkSubscription } from "~/ee/lib/core";
import { env } from "~/env.mjs";
import { getCurrentUser } from "~/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.type === UserType.APPLICANT) {
    redirect("/d");
  }

  if (!user.completedOnboarding || !user.activeOrgId) {
    redirect("/onboarding");
  }

  if (env.IS_EE) {
    await checkSubscription(user);
  }

  return (
    <div>
      <AbilityProvider user={user}>
        <UpgradeBanner activeOrg={user.activeOrg} />
        <Header user={user} />
        <div className="container relative flex">
          <aside
            id="sidebar"
            className="transition-width sticky inset-12 z-20 hidden h-full w-48 shrink-0 flex-col  font-normal duration-75 md:flex"
            aria-label="Sidebar"
          >
            <div className="mt-8 pr-8">
              <SideNav items={siteConfig.sidebarNav} />
            </div>
          </aside>
          <main
            id="main-content"
            className="relative mt-8 h-full w-full overflow-x-hidden pb-8 md:px-2"
          >
            {children}
          </main>
        </div>
      </AbilityProvider>
    </div>
  );
}
