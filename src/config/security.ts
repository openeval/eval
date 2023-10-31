import { MembershipRole } from "@prisma/client";

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
