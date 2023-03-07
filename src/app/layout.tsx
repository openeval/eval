import clsx from "clsx";
import "~/styles/globals.css";
import { Work_Sans } from "next/font/google";
import { Toaster } from "~/components/toaster";

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
      <body
        className={clsx(
          "min-h-screen bg-white font-sans text-slate-900 antialiased ",
          fontWorkSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
