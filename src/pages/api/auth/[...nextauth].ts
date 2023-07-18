import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";
import { linkInvitedUser } from "~/server/repositories/Candidates";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);
  if (
    req.query.nextauth?.includes("inviteEmailProvider") &&
    req.method === "GET"
  ) {
    const { assessmentId } = req.query;
    // TODO: augmentate createUser instead of replace it
    authOptions.events = {
      ...authOptions.events,
      async signIn(message) {
        const { user } = message;
        if (assessmentId) {
          await linkInvitedUser(user, assessmentId as string);
        }
      },
    };
  }

  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions);
}
