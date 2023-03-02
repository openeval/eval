import clsx from "clsx";

import "~/styles/globals.css";

import { Work_Sans } from "next/font/google";

const fontWorkSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-white font-sans text-slate-900 antialiased ",
          fontWorkSans.variable
        )}
      >
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          {children}
        </main>
      </body>
    </html>
  );
}
