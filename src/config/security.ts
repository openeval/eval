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

type CrudActions = "create" | "read" | "update" | "delete" | "manage";

export type Ability =
  | ["read", "dashboard"]
  | [CrudActions | "invite", "Member"]
  | [CrudActions, "Candidate"]
  | [CrudActions, "Submission"]
  | [CrudActions, "Organization"]
  | [CrudActions, "Billing"]
  | [CrudActions, "Assessment"]
  | [CrudActions, "Profile"]
  | [CrudActions, "all"]
  | [CrudActions, Partial<pUser>];
export type AppAbility = PureAbility<Ability, MongoQuery>;

// manage and all are special keywords in CASL.
// manage represents any action and all represents any subject.
// the order of the rules matter
export function defineAbilityFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility,
  );

  if (user.type === UserType.RECRUITER) {
    can("read", "all");

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
      can("manage", "Submission");
      can("read", "Candidate");
    }
  }

  if (user.type === UserType.APPLICANT) {
    cannot("read", "dashboard");
  }

  cannot("manage", "Profile", { id: { $ne: user.id } });

  return build();
}
