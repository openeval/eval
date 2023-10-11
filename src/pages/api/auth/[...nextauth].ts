import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";
import { linkInvitedUser } from "~/server/repositories/Candidates";
import type { NextApiRequest, NextApiResponse } from "next";
import { update as updateUser } from "~/server/repositories/User";
import { UserType } from "@prisma/client";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
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
        // Update user type , would be better to have it on email send but isn't supported
        // https://github.com/nextauthjs/next-auth/discussions/562
        await updateUser({ id: user.id }, { type: UserType.CANDIDATE });

        if (assessmentId) {
          await linkInvitedUser(user, assessmentId as string);
        }
      },
    };
  }

  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions);
}
