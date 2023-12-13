import clsx from "clsx";

import "~/styles/globals.css";

import { Work_Sans } from "next/font/google";
import { redirect } from "next/navigation";

import { Toaster } from "~/components/toaster";
import { UpgradeBanner } from "~/ee/components/UpgradeBanner";
import { checkSubscription } from "~/ee/lib/core";
import { env } from "~/env.mjs";
import { getCurrentUser } from "~/server/auth";

const fontWorkSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (env.IS_EE) {
    await checkSubscription(user);
  }

  return (
    <html dir="ltr" lang="en">
      <body
        className={clsx(
          "min-h-screen scroll-smooth bg-white font-sans text-slate-900 antialiased ",
          fontWorkSans.variable,
        )}
      >
        <UpgradeBanner activeOrg={user.activeOrg} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
