import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("auth/signin");
  }

  return (
    <div className="">
      <h1>Hello Home page</h1>

      <h2>list of elements from supabase</h2>
    </div>
  );
}
