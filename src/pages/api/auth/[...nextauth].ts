import { UserType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

import { FlowTypes } from "~/config/flows";
import { authOptions } from "~/server/auth";
import { linkInvitedUser } from "~/server/repositories/Candidates";
import { update as updateUser } from "~/server/repositories/User";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.nextauth?.includes("email") && req.method === "GET") {
    const { flow } = req.query;
    // TODO: augmentate createUser instead of replace it
    authOptions.events = {
      ...authOptions.events,
      async signIn(message) {
        const { user } = message;

        if (flow === FlowTypes.CANDIDATE_INVITED) {
          const { assessmentId } = req.query;
          // Update user type , would be better to have it on email send but isn't supported
          // https://github.com/nextauthjs/next-auth/discussions/562
          await updateUser({ id: user.id }, { type: UserType.CANDIDATE });

          if (assessmentId) {
            await linkInvitedUser(user, assessmentId as string);
          }
        }

        // users joining an organization
        // on their first login
        // we complete their onboarding
        // and accept their membership
        if (flow === FlowTypes.TEAM_MEMEBER_INVITED) {
          const { organizationId } = req.query;

          await updateUser(
            { id: user.id },
            {
              activeOrg: { connect: { id: organizationId as string } },
              completedOnboarding: true,
              memberships: {
                update: {
                  where: {
                    userId_organizationId: {
                      organizationId: organizationId as string,
                      userId: user.id,
                    },
                  },
                  data: {
                    accepted: true,
                  },
                },
              },
            },
          );
        }
      },
    };
  }

  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions);
}
