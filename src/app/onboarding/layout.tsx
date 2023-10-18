// "use client";
import "~/styles/globals.css";

import Header from "~/components/Header";

// import { OnboardingProgress } from "./candidate/[[...step]]/OnboardingProgress";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex overflow-hidden border-t border-transparent pt-16">
        <main
          id="main-content"
          className="container relative h-full w-full overflow-y-auto py-8"
        >
          {/* <OnboardingProgress /> */}
          {children}
        </main>
      </div>
    </div>
  );
}
