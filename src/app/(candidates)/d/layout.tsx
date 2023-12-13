import "~/styles/globals.css";

import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";

import Header from "~/components/Header";
import { SideNav } from "~/components/SideNav";
import { getCurrentUser } from "~/server/auth";

const sidebarNav = [
  {
    title: "Assessments",
    href: "/d",
    icon: "FileBadge",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.completedOnboarding) {
    redirect("/onboarding");
  }

  if (user.type !== UserType.CANDIDATE) {
    redirect("/");
  }

  return (
    <div>
      <Header />
      <div className="container relative flex">
        <aside
          id="sidebar"
          className="transition-width sticky inset-12 z-20 hidden h-full w-48 shrink-0 flex-col  font-normal duration-75 lg:flex"
          aria-label="Sidebar"
        >
          <div className="mt-8 pr-8">
            <SideNav items={sidebarNav} />
          </div>
        </aside>
        <main
          id="main-content"
          className="relative mt-8 h-full w-full overflow-x-hidden md:px-2"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
