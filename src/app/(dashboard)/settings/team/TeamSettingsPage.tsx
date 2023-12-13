"use server";

import { Avatar, AvatarFallback } from "~/components/ui/Avatar";
import { Badge } from "~/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { toStringUser } from "~/lib/utils";
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
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {toStringUser(membership.user, "short")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {toStringUser(membership.user)}
                      {!membership.accepted && (
                        <Badge variant="outline" className="ml-4">
                          pending
                        </Badge>
                      )}
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
