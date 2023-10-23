import "~/styles/globals.css";

import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";

import Header from "~/components/Header";
import { SideNav } from "~/components/SideNav";
import { siteConfig } from "~/config/site";
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

  if (user.type !== UserType.RECRUITER) {
    redirect("/d");
  }

  return (
    <div>
      <Header />
      <div className="flex overflow-hidden border-t border-transparent pt-16">
        <aside
          id="sidebar"
          className="transition-width fixed left-0 top-0 z-20 hidden h-full w-64 shrink-0 flex-col pt-16 font-normal duration-75 lg:flex"
          aria-label="Sidebar"
        >
          <div className="container mt-8">
            <SideNav items={siteConfig.sidebarNav} />
          </div>
        </aside>
        <main
          id="main-content"
          className="container relative h-full w-full overflow-y-auto py-8 lg:ml-64"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
