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
      <div className="container flex pt-16">
        <aside
          id="sidebar"
          className="transition-width fixed top-0 z-20 hidden h-full w-48 shrink-0 flex-col pt-16 font-normal duration-75 lg:flex"
          aria-label="Sidebar"
        >
          <div className="mt-8 pr-8">
            <SideNav items={siteConfig.sidebarNav} />
          </div>
        </aside>
        <main
          id="main-content"
          className="relative h-full w-full overflow-x-hidden py-8 md:px-2 lg:ml-48"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
