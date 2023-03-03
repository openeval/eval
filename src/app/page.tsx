import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";

import AuthShowcase from "~/components/AuthShowcase";
import { prisma } from "~/server/db";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const examples = await prisma.example.findMany();

  if (!session) {
    redirect("auth/signin");
  }

  return (
    <div className="">
      <h1>Hello Home page</h1>
      <AuthShowcase session={session} />
      <h2>list of elements from supabase</h2>
      <ul>
        {examples.map((example, key) => (
          <li key={key}>{example.id}</li>
        ))}
      </ul>
    </div>
  );
}
