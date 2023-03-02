"use client";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
interface AuthShowcaseProps {
  session: Session;
}
const AuthShowcase: React.FC<AuthShowcaseProps> = ({ session }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={session ? () => void signOut() : () => void signIn()}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default AuthShowcase;
