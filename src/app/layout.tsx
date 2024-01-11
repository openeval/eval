import "~/styles/globals.css";

import clsx from "clsx";
import { Work_Sans } from "next/font/google";

import { ThemeProvider } from "~/components/ThemeProvider";
import { Toaster } from "~/components/toaster";

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
  return (
    <html dir="ltr" lang="en">
      <body
        className={clsx(
          "min-h-screen scroll-smooth border-t-2 border-primary bg-background font-sans antialiased",
          fontWorkSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
