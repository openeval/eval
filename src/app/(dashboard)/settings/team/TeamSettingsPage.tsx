"use server";

import { Avatar, AvatarFallback } from "~/components/ui/Avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { cn, toStringUser } from "~/lib/utils";
import type { MembershipsByOrg } from "~/server/repositories/Membership";
import { InviteTeamMemberButton } from "./InviteTeamMemberButton";
import { MembershipRoleActions } from "./MembershipRoleActions";

type TeamSettingsPageProps = {
  data: { memberships: MembershipsByOrg };
};
export async function TeamSettingsPage({ data }: TeamSettingsPageProps) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Invite your team members to collaborate.
            </CardDescription>
          </div>
          <InviteTeamMemberButton />
        </CardHeader>
        <CardContent className="grid gap-6">
          {data.memberships.map((membership) => {
            return (
              <div
                key={membership.id}
                className="flex flex-col space-y-4  md:flex-row md:justify-between md:space-y-0 "
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="overflow-visible">
                    <AvatarFallback className="relative ">
                      <span
                        className={cn(
                          "absolute bottom-0 right-0 flex h-3 w-3 rounded-full",
                          { "bg-green-500": membership.accepted },
                          { "bg-yellow-500": !membership.accepted },
                        )}
                      />
                      {toStringUser(membership.user, "short")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {toStringUser(membership.user)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {membership.user.email}
                    </p>
                  </div>
                </div>

                <MembershipRoleActions membership={membership} />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
