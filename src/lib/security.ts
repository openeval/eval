import { MembershipRole } from "@prisma/client";
import type { User } from "next-auth";

export const roleList = [
  {
    name: "Member",
    value: MembershipRole.MEMBER,
    description: " Can view, comment and edit.",
  },
  {
    name: "Reviewer",
    value: MembershipRole.REVIEWER,
    description: "Can view, comment and review submissions.",
  },
  {
    name: "Admin",
    value: MembershipRole.ADMIN,
    description: "Can view, comment and manage billing.",
  },
  {
    name: "Owner",
    value: MembershipRole.OWNER,
    description: "Full access to all resources.",
  },
];

export function isGranted(
  user: User,
  roles: MembershipRole[] | MembershipRole,
): boolean {
  const granted = user.memberships.find(
    (item) =>
      item.organizationId === user.activeOrgId && roles.includes(item.role),
  );

  return granted ? true : false;
}
