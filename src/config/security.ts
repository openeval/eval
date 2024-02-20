import {
  AbilityBuilder,
  createMongoAbility,
  type MongoQuery,
  type PureAbility,
} from "@casl/ability";
import { MembershipRole, UserType, type User as pUser } from "@prisma/client";
import type { User } from "next-auth";

export const roleList = [
  {
    name: "Reviewer",
    value: MembershipRole.REVIEWER,
    description: "Can view, comment and review submissions.",
  },
  {
    name: "Member",
    value: MembershipRole.MEMBER,
    description: " Can view, comment and edit.",
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

type Actions = "invite" | "create" | "read" | "update" | "delete" | "manage";

export type Subjects =
  | "Dashboard"
  | "Member"
  | "Candidate"
  | "Submission"
  | "Organization"
  | "Billing"
  | "Assessment"
  | "Profile"
  | "all"
  | "Settings"
  | "ApplicantDashboard"
  | Partial<pUser>;

export type Ability = [Actions, Subjects];

export type AppAbility = PureAbility<Ability, MongoQuery>;

// manage and all are special keywords in CASL.
// manage represents any action and all represents any subject.
// the order of the rules matter
export function defineAbilityFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility,
  );

  if (user.type === UserType.RECRUITER) {
    if (user.membership?.role === MembershipRole.OWNER) {
      can("manage", "all");
    }
    if (user.membership?.role === MembershipRole.ADMIN) {
      can("manage", "all");
      cannot("delete", "Organization");
    }

    if (user.membership?.role === MembershipRole.MEMBER) {
      can("read", "all");
      can("create", "Assessment");
    }

    if (user.membership?.role === MembershipRole.REVIEWER) {
      can("read", "Dashboard");
      can("read", "Submission");
      can("read", "Candidate");
    }
  }

  if (user.type === UserType.APPLICANT) {
    can("manage", "ApplicantDashboard");
    cannot("manage", "Dashboard");
  }

  can("manage", "Profile", { id: { $eq: user.id } });
  cannot("manage", "Profile", { id: { $ne: user.id } });

  return build();
}
