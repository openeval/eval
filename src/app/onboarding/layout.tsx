import "~/styles/globals.css";

import { redirect } from "next/navigation";

import Header from "~/components/Header";
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

  return (
    <div>
      <Header user={user} withMenu={false} />
      <div className="flex overflow-hidden border-t border-transparent">
        <main
          id="main-content"
          className="container relative h-full w-full overflow-y-auto py-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
