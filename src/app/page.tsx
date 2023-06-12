import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("auth/signin");
  }

  redirect("/assessments");

  return <div></div>;
}
