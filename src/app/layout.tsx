import clsx from "clsx";

import { ThemeProvider } from "~/components/ThemeProvider";

import "~/styles/globals.css";

import { Work_Sans } from "next/font/google";

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
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          "min-h-screen scroll-smooth bg-background font-sans antialiased",
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
