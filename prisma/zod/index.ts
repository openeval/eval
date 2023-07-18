import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','completedOnboarding','image','type','activeOrgId']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const OrganizationScalarFieldEnumSchema = z.enum(['id','name','slug','logo','bio','size','createdAt','updatedAt']);

export const MembershipScalarFieldEnumSchema = z.enum(['userId','accepted','role','organizationId']);

export const CandidateScalarFieldEnumSchema = z.enum(['id','userId','organizationId','name','ghUsername','status','lastName','email','createdAt','updatedAt','createdById']);

export const AssessmentScalarFieldEnumSchema = z.enum(['id','title','slug','description','status','createdById','organizationId','ghIssuesQuerySeach','evaluationPeriod','createdAt','updatedAt','published','visibility']);

export const AssessmentSessionScalarFieldEnumSchema = z.enum(['id','sessionToken','expiresAt','status','assessmentId','startedAt','finishedAt','candidateId']);

export const SubmissionScalarFieldEnumSchema = z.enum(['id','status','createdAt','updatedAt','candidateId','assessmentSessionId','assessmentId']);

export const ContributionScalarFieldEnumSchema = z.enum(['id','type','title','description','url','meta','submissionId','contributorId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const UserTypeSchema = z.enum(['RECRUITER','CANDIDATE']);

export type UserTypeType = `${z.infer<typeof UserTypeSchema>}`

export const MembershipRoleSchema = z.enum(['MEMBER','HIRING_MANAGER','RECRUITER','ADMIN','OWNER']);

export type MembershipRoleType = `${z.infer<typeof MembershipRoleSchema>}`

export const CandidateStatusSchema = z.enum(['PENDING','ACCEPTED','VERIFIED','ARCHIVED']);

export type CandidateStatusType = `${z.infer<typeof CandidateStatusSchema>}`

export const AssessmentStatusSchema = z.enum(['DRAFT','ACTIVE','IN_PROGRESS','CLOSED','ARCHIVED']);

export type AssessmentStatusType = `${z.infer<typeof AssessmentStatusSchema>}`

export const VisibilitySchema = z.enum(['PUBLIC','PRIVATE','PROTECTED']);

export type VisibilityType = `${z.infer<typeof VisibilitySchema>}`

export const AssessmentSessionStatusSchema = z.enum(['STARTED','FINISHED']);

export type AssessmentSessionStatusType = `${z.infer<typeof AssessmentSessionStatusSchema>}`

export const SubmissionStateSchema = z.enum(['COMPLETED','REVIEWING','APPROVED','REJECTED']);

export type SubmissionStateType = `${z.infer<typeof SubmissionStateSchema>}`

export const ContributionTypeSchema = z.enum(['PULL_REQUEST','COMMENT','ISSUE']);

export type ContributionTypeType = `${z.infer<typeof ContributionTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  type: UserTypeSchema.nullable(),
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  completedOnboarding: z.boolean(),
  image: z.string().nullable(),
  activeOrgId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().nullable(),
  logo: z.string().nullable(),
  bio: z.string().nullable(),
  size: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Organization = z.infer<typeof OrganizationSchema>

/////////////////////////////////////////
// MEMBERSHIP SCHEMA
/////////////////////////////////////////

export const MembershipSchema = z.object({
  role: MembershipRoleSchema,
  userId: z.string(),
  accepted: z.boolean(),
  organizationId: z.string(),
})

export type Membership = z.infer<typeof MembershipSchema>

/////////////////////////////////////////
// CANDIDATE SCHEMA
/////////////////////////////////////////

export const CandidateSchema = z.object({
  status: CandidateStatusSchema,
  id: z.string(),
  userId: z.string().nullable(),
  organizationId: z.string().nullable(),
  name: z.string(),
  ghUsername: z.string().nullable(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdById: z.string().nullable(),
})

export type Candidate = z.infer<typeof CandidateSchema>

/////////////////////////////////////////
// ASSESSMENT SCHEMA
/////////////////////////////////////////

export const AssessmentSchema = z.object({
  status: AssessmentStatusSchema,
  visibility: VisibilitySchema,
  id: z.string(),
  title: z.string(),
  slug: z.string().nullable(),
  description: z.string(),
  createdById: z.string(),
  organizationId: z.string(),
  ghIssuesQuerySeach: z.string().nullable(),
  evaluationPeriod: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  published: z.boolean(),
})

export type Assessment = z.infer<typeof AssessmentSchema>

/////////////////////////////////////////
// ASSESSMENT SESSION SCHEMA
/////////////////////////////////////////

export const AssessmentSessionSchema = z.object({
  status: AssessmentSessionStatusSchema,
  id: z.string(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  assessmentId: z.string(),
  startedAt: z.coerce.date(),
  finishedAt: z.coerce.date().nullable(),
  candidateId: z.string(),
})

export type AssessmentSession = z.infer<typeof AssessmentSessionSchema>

/////////////////////////////////////////
// SUBMISSION SCHEMA
/////////////////////////////////////////

export const SubmissionSchema = z.object({
  status: SubmissionStateSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  candidateId: z.string(),
  assessmentSessionId: z.string(),
  assessmentId: z.string(),
})

export type Submission = z.infer<typeof SubmissionSchema>

/////////////////////////////////////////
// CONTRIBUTION SCHEMA
/////////////////////////////////////////

export const ContributionSchema = z.object({
  type: ContributionTypeSchema,
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: InputJsonValue,
  submissionId: z.string().nullable(),
  contributorId: z.string(),
})

export type Contribution = z.infer<typeof ContributionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  createdAssessments: z.union([z.boolean(),z.lazy(() => AssessmentFindManyArgsSchema)]).optional(),
  memberships: z.union([z.boolean(),z.lazy(() => MembershipFindManyArgsSchema)]).optional(),
  candidate: z.union([z.boolean(),z.lazy(() => CandidateArgsSchema)]).optional(),
  activeOrg: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  createdCandidates: z.union([z.boolean(),z.lazy(() => CandidateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  createdAssessments: z.boolean().optional(),
  memberships: z.boolean().optional(),
  createdCandidates: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  completedOnboarding: z.boolean().optional(),
  image: z.boolean().optional(),
  type: z.boolean().optional(),
  activeOrgId: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  createdAssessments: z.union([z.boolean(),z.lazy(() => AssessmentFindManyArgsSchema)]).optional(),
  memberships: z.union([z.boolean(),z.lazy(() => MembershipFindManyArgsSchema)]).optional(),
  candidate: z.union([z.boolean(),z.lazy(() => CandidateArgsSchema)]).optional(),
  activeOrg: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  createdCandidates: z.union([z.boolean(),z.lazy(() => CandidateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// ORGANIZATION
//------------------------------------------------------

export const OrganizationIncludeSchema: z.ZodType<Prisma.OrganizationInclude> = z.object({
  members: z.union([z.boolean(),z.lazy(() => MembershipFindManyArgsSchema)]).optional(),
  assessments: z.union([z.boolean(),z.lazy(() => AssessmentFindManyArgsSchema)]).optional(),
  candidates: z.union([z.boolean(),z.lazy(() => CandidateFindManyArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrganizationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OrganizationArgsSchema: z.ZodType<Prisma.OrganizationArgs> = z.object({
  select: z.lazy(() => OrganizationSelectSchema).optional(),
  include: z.lazy(() => OrganizationIncludeSchema).optional(),
}).strict();

export const OrganizationCountOutputTypeArgsSchema: z.ZodType<Prisma.OrganizationCountOutputTypeArgs> = z.object({
  select: z.lazy(() => OrganizationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const OrganizationCountOutputTypeSelectSchema: z.ZodType<Prisma.OrganizationCountOutputTypeSelect> = z.object({
  members: z.boolean().optional(),
  assessments: z.boolean().optional(),
  candidates: z.boolean().optional(),
  User: z.boolean().optional(),
}).strict();

export const OrganizationSelectSchema: z.ZodType<Prisma.OrganizationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  logo: z.boolean().optional(),
  bio: z.boolean().optional(),
  size: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  members: z.union([z.boolean(),z.lazy(() => MembershipFindManyArgsSchema)]).optional(),
  assessments: z.union([z.boolean(),z.lazy(() => AssessmentFindManyArgsSchema)]).optional(),
  candidates: z.union([z.boolean(),z.lazy(() => CandidateFindManyArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrganizationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MEMBERSHIP
//------------------------------------------------------

export const MembershipIncludeSchema: z.ZodType<Prisma.MembershipInclude> = z.object({
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const MembershipArgsSchema: z.ZodType<Prisma.MembershipArgs> = z.object({
  select: z.lazy(() => MembershipSelectSchema).optional(),
  include: z.lazy(() => MembershipIncludeSchema).optional(),
}).strict();

export const MembershipSelectSchema: z.ZodType<Prisma.MembershipSelect> = z.object({
  userId: z.boolean().optional(),
  accepted: z.boolean().optional(),
  role: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// CANDIDATE
//------------------------------------------------------

export const CandidateIncludeSchema: z.ZodType<Prisma.CandidateInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  assessmentSessions: z.union([z.boolean(),z.lazy(() => AssessmentSessionFindManyArgsSchema)]).optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  assessments: z.union([z.boolean(),z.lazy(() => AssessmentFindManyArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  contributions: z.union([z.boolean(),z.lazy(() => ContributionFindManyArgsSchema)]).optional(),
  Submission: z.union([z.boolean(),z.lazy(() => SubmissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CandidateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CandidateArgsSchema: z.ZodType<Prisma.CandidateArgs> = z.object({
  select: z.lazy(() => CandidateSelectSchema).optional(),
  include: z.lazy(() => CandidateIncludeSchema).optional(),
}).strict();

export const CandidateCountOutputTypeArgsSchema: z.ZodType<Prisma.CandidateCountOutputTypeArgs> = z.object({
  select: z.lazy(() => CandidateCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CandidateCountOutputTypeSelectSchema: z.ZodType<Prisma.CandidateCountOutputTypeSelect> = z.object({
  assessmentSessions: z.boolean().optional(),
  assessments: z.boolean().optional(),
  contributions: z.boolean().optional(),
  Submission: z.boolean().optional(),
}).strict();

export const CandidateSelectSchema: z.ZodType<Prisma.CandidateSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  name: z.boolean().optional(),
  ghUsername: z.boolean().optional(),
  status: z.boolean().optional(),
  lastName: z.boolean().optional(),
  email: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdById: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  assessmentSessions: z.union([z.boolean(),z.lazy(() => AssessmentSessionFindManyArgsSchema)]).optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  assessments: z.union([z.boolean(),z.lazy(() => AssessmentFindManyArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  contributions: z.union([z.boolean(),z.lazy(() => ContributionFindManyArgsSchema)]).optional(),
  Submission: z.union([z.boolean(),z.lazy(() => SubmissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CandidateCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ASSESSMENT
//------------------------------------------------------

export const AssessmentIncludeSchema: z.ZodType<Prisma.AssessmentInclude> = z.object({
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  candidates: z.union([z.boolean(),z.lazy(() => CandidateFindManyArgsSchema)]).optional(),
  applicantSessions: z.union([z.boolean(),z.lazy(() => AssessmentSessionFindManyArgsSchema)]).optional(),
  Submission: z.union([z.boolean(),z.lazy(() => SubmissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AssessmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AssessmentArgsSchema: z.ZodType<Prisma.AssessmentArgs> = z.object({
  select: z.lazy(() => AssessmentSelectSchema).optional(),
  include: z.lazy(() => AssessmentIncludeSchema).optional(),
}).strict();

export const AssessmentCountOutputTypeArgsSchema: z.ZodType<Prisma.AssessmentCountOutputTypeArgs> = z.object({
  select: z.lazy(() => AssessmentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AssessmentCountOutputTypeSelectSchema: z.ZodType<Prisma.AssessmentCountOutputTypeSelect> = z.object({
  candidates: z.boolean().optional(),
  applicantSessions: z.boolean().optional(),
  Submission: z.boolean().optional(),
}).strict();

export const AssessmentSelectSchema: z.ZodType<Prisma.AssessmentSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  slug: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  createdById: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  ghIssuesQuerySeach: z.boolean().optional(),
  evaluationPeriod: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  published: z.boolean().optional(),
  visibility: z.boolean().optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  candidates: z.union([z.boolean(),z.lazy(() => CandidateFindManyArgsSchema)]).optional(),
  applicantSessions: z.union([z.boolean(),z.lazy(() => AssessmentSessionFindManyArgsSchema)]).optional(),
  Submission: z.union([z.boolean(),z.lazy(() => SubmissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AssessmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ASSESSMENT SESSION
//------------------------------------------------------

export const AssessmentSessionIncludeSchema: z.ZodType<Prisma.AssessmentSessionInclude> = z.object({
  assessment: z.union([z.boolean(),z.lazy(() => AssessmentArgsSchema)]).optional(),
  candidate: z.union([z.boolean(),z.lazy(() => CandidateArgsSchema)]).optional(),
  Submission: z.union([z.boolean(),z.lazy(() => SubmissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AssessmentSessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AssessmentSessionArgsSchema: z.ZodType<Prisma.AssessmentSessionArgs> = z.object({
  select: z.lazy(() => AssessmentSessionSelectSchema).optional(),
  include: z.lazy(() => AssessmentSessionIncludeSchema).optional(),
}).strict();

export const AssessmentSessionCountOutputTypeArgsSchema: z.ZodType<Prisma.AssessmentSessionCountOutputTypeArgs> = z.object({
  select: z.lazy(() => AssessmentSessionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AssessmentSessionCountOutputTypeSelectSchema: z.ZodType<Prisma.AssessmentSessionCountOutputTypeSelect> = z.object({
  Submission: z.boolean().optional(),
}).strict();

export const AssessmentSessionSelectSchema: z.ZodType<Prisma.AssessmentSessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  status: z.boolean().optional(),
  assessmentId: z.boolean().optional(),
  startedAt: z.boolean().optional(),
  finishedAt: z.boolean().optional(),
  candidateId: z.boolean().optional(),
  assessment: z.union([z.boolean(),z.lazy(() => AssessmentArgsSchema)]).optional(),
  candidate: z.union([z.boolean(),z.lazy(() => CandidateArgsSchema)]).optional(),
  Submission: z.union([z.boolean(),z.lazy(() => SubmissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AssessmentSessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SUBMISSION
//------------------------------------------------------

export const SubmissionIncludeSchema: z.ZodType<Prisma.SubmissionInclude> = z.object({
  contributions: z.union([z.boolean(),z.lazy(() => ContributionFindManyArgsSchema)]).optional(),
  candidate: z.union([z.boolean(),z.lazy(() => CandidateArgsSchema)]).optional(),
  session: z.union([z.boolean(),z.lazy(() => AssessmentSessionArgsSchema)]).optional(),
  assessment: z.union([z.boolean(),z.lazy(() => AssessmentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SubmissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SubmissionArgsSchema: z.ZodType<Prisma.SubmissionArgs> = z.object({
  select: z.lazy(() => SubmissionSelectSchema).optional(),
  include: z.lazy(() => SubmissionIncludeSchema).optional(),
}).strict();

export const SubmissionCountOutputTypeArgsSchema: z.ZodType<Prisma.SubmissionCountOutputTypeArgs> = z.object({
  select: z.lazy(() => SubmissionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SubmissionCountOutputTypeSelectSchema: z.ZodType<Prisma.SubmissionCountOutputTypeSelect> = z.object({
  contributions: z.boolean().optional(),
}).strict();

export const SubmissionSelectSchema: z.ZodType<Prisma.SubmissionSelect> = z.object({
  id: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  candidateId: z.boolean().optional(),
  assessmentSessionId: z.boolean().optional(),
  assessmentId: z.boolean().optional(),
  contributions: z.union([z.boolean(),z.lazy(() => ContributionFindManyArgsSchema)]).optional(),
  candidate: z.union([z.boolean(),z.lazy(() => CandidateArgsSchema)]).optional(),
  session: z.union([z.boolean(),z.lazy(() => AssessmentSessionArgsSchema)]).optional(),
  assessment: z.union([z.boolean(),z.lazy(() => AssessmentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SubmissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTRIBUTION
//------------------------------------------------------

export const ContributionIncludeSchema: z.ZodType<Prisma.ContributionInclude> = z.object({
  submission: z.union([z.boolean(),z.lazy(() => SubmissionArgsSchema)]).optional(),
  contributor: z.union([z.boolean(),z.lazy(() => CandidateArgsSchema)]).optional(),
}).strict()

export const ContributionArgsSchema: z.ZodType<Prisma.ContributionArgs> = z.object({
  select: z.lazy(() => ContributionSelectSchema).optional(),
  include: z.lazy(() => ContributionIncludeSchema).optional(),
}).strict();

export const ContributionSelectSchema: z.ZodType<Prisma.ContributionSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  url: z.boolean().optional(),
  meta: z.boolean().optional(),
  submissionId: z.boolean().optional(),
  contributorId: z.boolean().optional(),
  submission: z.union([z.boolean(),z.lazy(() => SubmissionArgsSchema)]).optional(),
  contributor: z.union([z.boolean(),z.lazy(() => CandidateArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  completedOnboarding: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumUserTypeNullableFilterSchema),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentListRelationFilterSchema).optional(),
  memberships: z.lazy(() => MembershipListRelationFilterSchema).optional(),
  candidate: z.union([ z.lazy(() => CandidateRelationFilterSchema),z.lazy(() => CandidateWhereInputSchema) ]).optional().nullable(),
  activeOrg: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional().nullable(),
  createdCandidates: z.lazy(() => CandidateListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  completedOnboarding: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  activeOrgId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentOrderByRelationAggregateInputSchema).optional(),
  memberships: z.lazy(() => MembershipOrderByRelationAggregateInputSchema).optional(),
  candidate: z.lazy(() => CandidateOrderByWithRelationInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  completedOnboarding: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumUserTypeNullableFilterSchema),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentListRelationFilterSchema).optional(),
  memberships: z.lazy(() => MembershipListRelationFilterSchema).optional(),
  candidate: z.union([ z.lazy(() => CandidateRelationFilterSchema),z.lazy(() => CandidateWhereInputSchema) ]).optional().nullable(),
  activeOrg: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional().nullable(),
  createdCandidates: z.lazy(() => CandidateListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  completedOnboarding: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  activeOrgId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  completedOnboarding: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumUserTypeNullableWithAggregatesFilterSchema),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const OrganizationWhereInputSchema: z.ZodType<Prisma.OrganizationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  size: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  members: z.lazy(() => MembershipListRelationFilterSchema).optional(),
  assessments: z.lazy(() => AssessmentListRelationFilterSchema).optional(),
  candidates: z.lazy(() => CandidateListRelationFilterSchema).optional(),
  User: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const OrganizationOrderByWithRelationInputSchema: z.ZodType<Prisma.OrganizationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  logo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  members: z.lazy(() => MembershipOrderByRelationAggregateInputSchema).optional(),
  assessments: z.lazy(() => AssessmentOrderByRelationAggregateInputSchema).optional(),
  candidates: z.lazy(() => CandidateOrderByRelationAggregateInputSchema).optional(),
  User: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const OrganizationWhereUniqueInputSchema: z.ZodType<Prisma.OrganizationWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    slug: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  size: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  members: z.lazy(() => MembershipListRelationFilterSchema).optional(),
  assessments: z.lazy(() => AssessmentListRelationFilterSchema).optional(),
  candidates: z.lazy(() => CandidateListRelationFilterSchema).optional(),
  User: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict());

export const OrganizationOrderByWithAggregationInputSchema: z.ZodType<Prisma.OrganizationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  logo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  size: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OrganizationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OrganizationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OrganizationMinOrderByAggregateInputSchema).optional()
}).strict();

export const OrganizationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OrganizationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema),z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema),z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  logo: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  size: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MembershipWhereInputSchema: z.ZodType<Prisma.MembershipWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MembershipWhereInputSchema),z.lazy(() => MembershipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembershipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembershipWhereInputSchema),z.lazy(() => MembershipWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  accepted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumMembershipRoleFilterSchema),z.lazy(() => MembershipRoleSchema) ]).optional(),
  organizationId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const MembershipOrderByWithRelationInputSchema: z.ZodType<Prisma.MembershipOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  accepted: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const MembershipWhereUniqueInputSchema: z.ZodType<Prisma.MembershipWhereUniqueInput> = z.object({
  userId_organizationId: z.lazy(() => MembershipUserIdOrganizationIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_organizationId: z.lazy(() => MembershipUserIdOrganizationIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => MembershipWhereInputSchema),z.lazy(() => MembershipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembershipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembershipWhereInputSchema),z.lazy(() => MembershipWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  accepted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumMembershipRoleFilterSchema),z.lazy(() => MembershipRoleSchema) ]).optional(),
  organizationId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const MembershipOrderByWithAggregationInputSchema: z.ZodType<Prisma.MembershipOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  accepted: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MembershipCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MembershipMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MembershipMinOrderByAggregateInputSchema).optional()
}).strict();

export const MembershipScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MembershipScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MembershipScalarWhereWithAggregatesInputSchema),z.lazy(() => MembershipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembershipScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembershipScalarWhereWithAggregatesInputSchema),z.lazy(() => MembershipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  accepted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumMembershipRoleWithAggregatesFilterSchema),z.lazy(() => MembershipRoleSchema) ]).optional(),
  organizationId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CandidateWhereInputSchema: z.ZodType<Prisma.CandidateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CandidateWhereInputSchema),z.lazy(() => CandidateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CandidateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CandidateWhereInputSchema),z.lazy(() => CandidateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ghUsername: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumCandidateStatusFilterSchema),z.lazy(() => CandidateStatusSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionListRelationFilterSchema).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional().nullable(),
  assessments: z.lazy(() => AssessmentListRelationFilterSchema).optional(),
  createdBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  contributions: z.lazy(() => ContributionListRelationFilterSchema).optional(),
  Submission: z.lazy(() => SubmissionListRelationFilterSchema).optional()
}).strict();

export const CandidateOrderByWithRelationInputSchema: z.ZodType<Prisma.CandidateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  organizationId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ghUsername: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionOrderByRelationAggregateInputSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  assessments: z.lazy(() => AssessmentOrderByRelationAggregateInputSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  contributions: z.lazy(() => ContributionOrderByRelationAggregateInputSchema).optional(),
  Submission: z.lazy(() => SubmissionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CandidateWhereUniqueInputSchema: z.ZodType<Prisma.CandidateWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    userId: z.string(),
    email: z.string(),
    id_email_organizationId: z.lazy(() => CandidateIdEmailOrganizationIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    userId: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    userId: z.string(),
    id_email_organizationId: z.lazy(() => CandidateIdEmailOrganizationIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
    userId: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
    id_email_organizationId: z.lazy(() => CandidateIdEmailOrganizationIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    id_email_organizationId: z.lazy(() => CandidateIdEmailOrganizationIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    userId: z.string(),
    email: z.string(),
    id_email_organizationId: z.lazy(() => CandidateIdEmailOrganizationIdCompoundUniqueInputSchema),
  }),
  z.object({
    userId: z.string(),
    email: z.string(),
  }),
  z.object({
    userId: z.string(),
    id_email_organizationId: z.lazy(() => CandidateIdEmailOrganizationIdCompoundUniqueInputSchema),
  }),
  z.object({
    userId: z.string(),
  }),
  z.object({
    email: z.string(),
    id_email_organizationId: z.lazy(() => CandidateIdEmailOrganizationIdCompoundUniqueInputSchema),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    id_email_organizationId: z.lazy(() => CandidateIdEmailOrganizationIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  email: z.string().optional(),
  id_email_organizationId: z.lazy(() => CandidateIdEmailOrganizationIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CandidateWhereInputSchema),z.lazy(() => CandidateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CandidateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CandidateWhereInputSchema),z.lazy(() => CandidateWhereInputSchema).array() ]).optional(),
  organizationId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ghUsername: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumCandidateStatusFilterSchema),z.lazy(() => CandidateStatusSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionListRelationFilterSchema).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional().nullable(),
  assessments: z.lazy(() => AssessmentListRelationFilterSchema).optional(),
  createdBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  contributions: z.lazy(() => ContributionListRelationFilterSchema).optional(),
  Submission: z.lazy(() => SubmissionListRelationFilterSchema).optional()
}).strict());

export const CandidateOrderByWithAggregationInputSchema: z.ZodType<Prisma.CandidateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  organizationId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ghUsername: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CandidateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CandidateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CandidateMinOrderByAggregateInputSchema).optional()
}).strict();

export const CandidateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CandidateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CandidateScalarWhereWithAggregatesInputSchema),z.lazy(() => CandidateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CandidateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CandidateScalarWhereWithAggregatesInputSchema),z.lazy(() => CandidateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ghUsername: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumCandidateStatusWithAggregatesFilterSchema),z.lazy(() => CandidateStatusSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AssessmentWhereInputSchema: z.ZodType<Prisma.AssessmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AssessmentWhereInputSchema),z.lazy(() => AssessmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssessmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssessmentWhereInputSchema),z.lazy(() => AssessmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumAssessmentStatusFilterSchema),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  createdById: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  ghIssuesQuerySeach: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  evaluationPeriod: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  visibility: z.union([ z.lazy(() => EnumVisibilityFilterSchema),z.lazy(() => VisibilitySchema) ]).optional(),
  createdBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  candidates: z.lazy(() => CandidateListRelationFilterSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionListRelationFilterSchema).optional(),
  Submission: z.lazy(() => SubmissionListRelationFilterSchema).optional()
}).strict();

export const AssessmentOrderByWithRelationInputSchema: z.ZodType<Prisma.AssessmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  ghIssuesQuerySeach: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  evaluationPeriod: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  visibility: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  candidates: z.lazy(() => CandidateOrderByRelationAggregateInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionOrderByRelationAggregateInputSchema).optional(),
  Submission: z.lazy(() => SubmissionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AssessmentWhereUniqueInputSchema: z.ZodType<Prisma.AssessmentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AssessmentWhereInputSchema),z.lazy(() => AssessmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssessmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssessmentWhereInputSchema),z.lazy(() => AssessmentWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumAssessmentStatusFilterSchema),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  createdById: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  ghIssuesQuerySeach: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  evaluationPeriod: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  visibility: z.union([ z.lazy(() => EnumVisibilityFilterSchema),z.lazy(() => VisibilitySchema) ]).optional(),
  createdBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  candidates: z.lazy(() => CandidateListRelationFilterSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionListRelationFilterSchema).optional(),
  Submission: z.lazy(() => SubmissionListRelationFilterSchema).optional()
}).strict());

export const AssessmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AssessmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  ghIssuesQuerySeach: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  evaluationPeriod: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  visibility: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AssessmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AssessmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AssessmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AssessmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AssessmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const AssessmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AssessmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AssessmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AssessmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssessmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssessmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AssessmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumAssessmentStatusWithAggregatesFilterSchema),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  createdById: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  ghIssuesQuerySeach: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  evaluationPeriod: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  published: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  visibility: z.union([ z.lazy(() => EnumVisibilityWithAggregatesFilterSchema),z.lazy(() => VisibilitySchema) ]).optional(),
}).strict();

export const AssessmentSessionWhereInputSchema: z.ZodType<Prisma.AssessmentSessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AssessmentSessionWhereInputSchema),z.lazy(() => AssessmentSessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssessmentSessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssessmentSessionWhereInputSchema),z.lazy(() => AssessmentSessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumAssessmentSessionStatusFilterSchema),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  assessmentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  startedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  finishedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  candidateId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assessment: z.union([ z.lazy(() => AssessmentRelationFilterSchema),z.lazy(() => AssessmentWhereInputSchema) ]).optional(),
  candidate: z.union([ z.lazy(() => CandidateRelationFilterSchema),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
  Submission: z.lazy(() => SubmissionListRelationFilterSchema).optional()
}).strict();

export const AssessmentSessionOrderByWithRelationInputSchema: z.ZodType<Prisma.AssessmentSessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  finishedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional(),
  assessment: z.lazy(() => AssessmentOrderByWithRelationInputSchema).optional(),
  candidate: z.lazy(() => CandidateOrderByWithRelationInputSchema).optional(),
  Submission: z.lazy(() => SubmissionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AssessmentSessionWhereUniqueInputSchema: z.ZodType<Prisma.AssessmentSessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => AssessmentSessionWhereInputSchema),z.lazy(() => AssessmentSessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssessmentSessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssessmentSessionWhereInputSchema),z.lazy(() => AssessmentSessionWhereInputSchema).array() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumAssessmentSessionStatusFilterSchema),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  assessmentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  startedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  finishedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  candidateId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assessment: z.union([ z.lazy(() => AssessmentRelationFilterSchema),z.lazy(() => AssessmentWhereInputSchema) ]).optional(),
  candidate: z.union([ z.lazy(() => CandidateRelationFilterSchema),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
  Submission: z.lazy(() => SubmissionListRelationFilterSchema).optional()
}).strict());

export const AssessmentSessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.AssessmentSessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  finishedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AssessmentSessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AssessmentSessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AssessmentSessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const AssessmentSessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AssessmentSessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AssessmentSessionScalarWhereWithAggregatesInputSchema),z.lazy(() => AssessmentSessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssessmentSessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssessmentSessionScalarWhereWithAggregatesInputSchema),z.lazy(() => AssessmentSessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumAssessmentSessionStatusWithAggregatesFilterSchema),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  assessmentId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  startedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  finishedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  candidateId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SubmissionWhereInputSchema: z.ZodType<Prisma.SubmissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubmissionWhereInputSchema),z.lazy(() => SubmissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubmissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubmissionWhereInputSchema),z.lazy(() => SubmissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubmissionStateFilterSchema),z.lazy(() => SubmissionStateSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  candidateId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assessmentSessionId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assessmentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contributions: z.lazy(() => ContributionListRelationFilterSchema).optional(),
  candidate: z.union([ z.lazy(() => CandidateRelationFilterSchema),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
  session: z.union([ z.lazy(() => AssessmentSessionRelationFilterSchema),z.lazy(() => AssessmentSessionWhereInputSchema) ]).optional(),
  assessment: z.union([ z.lazy(() => AssessmentRelationFilterSchema),z.lazy(() => AssessmentWhereInputSchema) ]).optional(),
}).strict();

export const SubmissionOrderByWithRelationInputSchema: z.ZodType<Prisma.SubmissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional(),
  assessmentSessionId: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional(),
  contributions: z.lazy(() => ContributionOrderByRelationAggregateInputSchema).optional(),
  candidate: z.lazy(() => CandidateOrderByWithRelationInputSchema).optional(),
  session: z.lazy(() => AssessmentSessionOrderByWithRelationInputSchema).optional(),
  assessment: z.lazy(() => AssessmentOrderByWithRelationInputSchema).optional()
}).strict();

export const SubmissionWhereUniqueInputSchema: z.ZodType<Prisma.SubmissionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SubmissionWhereInputSchema),z.lazy(() => SubmissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubmissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubmissionWhereInputSchema),z.lazy(() => SubmissionWhereInputSchema).array() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubmissionStateFilterSchema),z.lazy(() => SubmissionStateSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  candidateId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assessmentSessionId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assessmentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contributions: z.lazy(() => ContributionListRelationFilterSchema).optional(),
  candidate: z.union([ z.lazy(() => CandidateRelationFilterSchema),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
  session: z.union([ z.lazy(() => AssessmentSessionRelationFilterSchema),z.lazy(() => AssessmentSessionWhereInputSchema) ]).optional(),
  assessment: z.union([ z.lazy(() => AssessmentRelationFilterSchema),z.lazy(() => AssessmentWhereInputSchema) ]).optional(),
}).strict());

export const SubmissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubmissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional(),
  assessmentSessionId: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SubmissionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubmissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubmissionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SubmissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubmissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SubmissionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubmissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubmissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubmissionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubmissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubmissionStateWithAggregatesFilterSchema),z.lazy(() => SubmissionStateSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  candidateId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  assessmentSessionId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  assessmentId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ContributionWhereInputSchema: z.ZodType<Prisma.ContributionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContributionWhereInputSchema),z.lazy(() => ContributionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContributionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContributionWhereInputSchema),z.lazy(() => ContributionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumContributionTypeFilterSchema),z.lazy(() => ContributionTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonFilterSchema).optional(),
  submissionId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  contributorId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  submission: z.union([ z.lazy(() => SubmissionRelationFilterSchema),z.lazy(() => SubmissionWhereInputSchema) ]).optional().nullable(),
  contributor: z.union([ z.lazy(() => CandidateRelationFilterSchema),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
}).strict();

export const ContributionOrderByWithRelationInputSchema: z.ZodType<Prisma.ContributionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  submissionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contributorId: z.lazy(() => SortOrderSchema).optional(),
  submission: z.lazy(() => SubmissionOrderByWithRelationInputSchema).optional(),
  contributor: z.lazy(() => CandidateOrderByWithRelationInputSchema).optional()
}).strict();

export const ContributionWhereUniqueInputSchema: z.ZodType<Prisma.ContributionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ContributionWhereInputSchema),z.lazy(() => ContributionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContributionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContributionWhereInputSchema),z.lazy(() => ContributionWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumContributionTypeFilterSchema),z.lazy(() => ContributionTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonFilterSchema).optional(),
  submissionId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  contributorId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  submission: z.union([ z.lazy(() => SubmissionRelationFilterSchema),z.lazy(() => SubmissionWhereInputSchema) ]).optional().nullable(),
  contributor: z.union([ z.lazy(() => CandidateRelationFilterSchema),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
}).strict());

export const ContributionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContributionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  submissionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contributorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContributionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContributionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContributionMinOrderByAggregateInputSchema).optional()
}).strict();

export const ContributionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContributionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContributionScalarWhereWithAggregatesInputSchema),z.lazy(() => ContributionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContributionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContributionScalarWhereWithAggregatesInputSchema),z.lazy(() => ContributionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumContributionTypeWithAggregatesFilterSchema),z.lazy(() => ContributionTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  submissionId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contributorId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutUserInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  activeOrgId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneWithoutUserNestedInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  activeOrgId: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrganizationCreateInputSchema: z.ZodType<Prisma.OrganizationCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => MembershipCreateNestedManyWithoutOrganizationInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutOrganizationInputSchema).optional(),
  candidates: z.lazy(() => CandidateCreateNestedManyWithoutOrganizationInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedManyWithoutActiveOrgInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutActiveOrgInputSchema).optional()
}).strict();

export const OrganizationUpdateInputSchema: z.ZodType<Prisma.OrganizationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembershipUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateManyWithoutActiveOrgNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembershipUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutActiveOrgNestedInputSchema).optional()
}).strict();

export const OrganizationCreateManyInputSchema: z.ZodType<Prisma.OrganizationCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const OrganizationUpdateManyMutationInputSchema: z.ZodType<Prisma.OrganizationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrganizationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MembershipCreateInputSchema: z.ZodType<Prisma.MembershipCreateInput> = z.object({
  accepted: z.boolean().optional(),
  role: z.lazy(() => MembershipRoleSchema),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutMembershipsInputSchema)
}).strict();

export const MembershipUncheckedCreateInputSchema: z.ZodType<Prisma.MembershipUncheckedCreateInput> = z.object({
  userId: z.string(),
  accepted: z.boolean().optional(),
  role: z.lazy(() => MembershipRoleSchema),
  organizationId: z.string()
}).strict();

export const MembershipUpdateInputSchema: z.ZodType<Prisma.MembershipUpdateInput> = z.object({
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMembershipsNestedInputSchema).optional()
}).strict();

export const MembershipUncheckedUpdateInputSchema: z.ZodType<Prisma.MembershipUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MembershipCreateManyInputSchema: z.ZodType<Prisma.MembershipCreateManyInput> = z.object({
  userId: z.string(),
  accepted: z.boolean().optional(),
  role: z.lazy(() => MembershipRoleSchema),
  organizationId: z.string()
}).strict();

export const MembershipUpdateManyMutationInputSchema: z.ZodType<Prisma.MembershipUpdateManyMutationInput> = z.object({
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MembershipUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MembershipUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CandidateCreateInputSchema: z.ZodType<Prisma.CandidateCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCandidateInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutCandidateInputSchema).optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutCandidatesInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutCandidatesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateUncheckedCreateInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string().optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateUpdateInputSchema: z.ZodType<Prisma.CandidateUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCandidateNestedInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutCandidateNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneWithoutCandidatesNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateCreateManyInputSchema: z.ZodType<Prisma.CandidateCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string().optional().nullable()
}).strict();

export const CandidateUpdateManyMutationInputSchema: z.ZodType<Prisma.CandidateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CandidateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AssessmentCreateInputSchema: z.ZodType<Prisma.AssessmentCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedAssessmentsInputSchema),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutAssessmentsInputSchema),
  candidates: z.lazy(() => CandidateCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutAssessmentInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentUncheckedCreateInputSchema: z.ZodType<Prisma.AssessmentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  createdById: z.string(),
  organizationId: z.string(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentUpdateInputSchema: z.ZodType<Prisma.AssessmentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAssessmentsNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutAssessmentsNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutAssessmentNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const AssessmentUncheckedUpdateInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  candidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const AssessmentCreateManyInputSchema: z.ZodType<Prisma.AssessmentCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  createdById: z.string(),
  organizationId: z.string(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional()
}).strict();

export const AssessmentUpdateManyMutationInputSchema: z.ZodType<Prisma.AssessmentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AssessmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AssessmentSessionCreateInputSchema: z.ZodType<Prisma.AssessmentSessionCreateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  assessment: z.lazy(() => AssessmentCreateNestedOneWithoutApplicantSessionsInputSchema),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutAssessmentSessionsInputSchema),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const AssessmentSessionUncheckedCreateInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  assessmentId: z.string(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  candidateId: z.string(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const AssessmentSessionUpdateInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessment: z.lazy(() => AssessmentUpdateOneRequiredWithoutApplicantSessionsNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneRequiredWithoutAssessmentSessionsNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const AssessmentSessionUncheckedUpdateInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const AssessmentSessionCreateManyInputSchema: z.ZodType<Prisma.AssessmentSessionCreateManyInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  assessmentId: z.string(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  candidateId: z.string()
}).strict();

export const AssessmentSessionUpdateManyMutationInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AssessmentSessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubmissionCreateInputSchema: z.ZodType<Prisma.SubmissionCreateInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutSubmissionInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutSubmissionInputSchema),
  session: z.lazy(() => AssessmentSessionCreateNestedOneWithoutSubmissionInputSchema),
  assessment: z.lazy(() => AssessmentCreateNestedOneWithoutSubmissionInputSchema)
}).strict();

export const SubmissionUncheckedCreateInputSchema: z.ZodType<Prisma.SubmissionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  candidateId: z.string(),
  assessmentSessionId: z.string(),
  assessmentId: z.string(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutSubmissionInputSchema).optional()
}).strict();

export const SubmissionUpdateInputSchema: z.ZodType<Prisma.SubmissionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutSubmissionNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional(),
  session: z.lazy(() => AssessmentSessionUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional(),
  assessment: z.lazy(() => AssessmentUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional()
}).strict();

export const SubmissionUncheckedUpdateInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentSessionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutSubmissionNestedInputSchema).optional()
}).strict();

export const SubmissionCreateManyInputSchema: z.ZodType<Prisma.SubmissionCreateManyInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  candidateId: z.string(),
  assessmentSessionId: z.string(),
  assessmentId: z.string()
}).strict();

export const SubmissionUpdateManyMutationInputSchema: z.ZodType<Prisma.SubmissionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubmissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentSessionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContributionCreateInputSchema: z.ZodType<Prisma.ContributionCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ContributionTypeSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  submission: z.lazy(() => SubmissionCreateNestedOneWithoutContributionsInputSchema).optional(),
  contributor: z.lazy(() => CandidateCreateNestedOneWithoutContributionsInputSchema)
}).strict();

export const ContributionUncheckedCreateInputSchema: z.ZodType<Prisma.ContributionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ContributionTypeSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  submissionId: z.string().optional().nullable(),
  contributorId: z.string()
}).strict();

export const ContributionUpdateInputSchema: z.ZodType<Prisma.ContributionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => EnumContributionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  submission: z.lazy(() => SubmissionUpdateOneWithoutContributionsNestedInputSchema).optional(),
  contributor: z.lazy(() => CandidateUpdateOneRequiredWithoutContributionsNestedInputSchema).optional()
}).strict();

export const ContributionUncheckedUpdateInputSchema: z.ZodType<Prisma.ContributionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => EnumContributionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  submissionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContributionCreateManyInputSchema: z.ZodType<Prisma.ContributionCreateManyInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ContributionTypeSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  submissionId: z.string().optional().nullable(),
  contributorId: z.string()
}).strict();

export const ContributionUpdateManyMutationInputSchema: z.ZodType<Prisma.ContributionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => EnumContributionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ContributionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContributionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => EnumContributionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  submissionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contributorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EnumUserTypeNullableFilterSchema: z.ZodType<Prisma.EnumUserTypeNullableFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional().nullable(),
  in: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  notIn: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const AssessmentListRelationFilterSchema: z.ZodType<Prisma.AssessmentListRelationFilter> = z.object({
  every: z.lazy(() => AssessmentWhereInputSchema).optional(),
  some: z.lazy(() => AssessmentWhereInputSchema).optional(),
  none: z.lazy(() => AssessmentWhereInputSchema).optional()
}).strict();

export const MembershipListRelationFilterSchema: z.ZodType<Prisma.MembershipListRelationFilter> = z.object({
  every: z.lazy(() => MembershipWhereInputSchema).optional(),
  some: z.lazy(() => MembershipWhereInputSchema).optional(),
  none: z.lazy(() => MembershipWhereInputSchema).optional()
}).strict();

export const CandidateRelationFilterSchema: z.ZodType<Prisma.CandidateRelationFilter> = z.object({
  is: z.lazy(() => CandidateWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CandidateWhereInputSchema).optional().nullable()
}).strict();

export const OrganizationRelationFilterSchema: z.ZodType<Prisma.OrganizationRelationFilter> = z.object({
  is: z.lazy(() => OrganizationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => OrganizationWhereInputSchema).optional().nullable()
}).strict();

export const CandidateListRelationFilterSchema: z.ZodType<Prisma.CandidateListRelationFilter> = z.object({
  every: z.lazy(() => CandidateWhereInputSchema).optional(),
  some: z.lazy(() => CandidateWhereInputSchema).optional(),
  none: z.lazy(() => CandidateWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AssessmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AssessmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MembershipOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MembershipOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CandidateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CandidateOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  completedOnboarding: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  activeOrgId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  completedOnboarding: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  activeOrgId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  completedOnboarding: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  activeOrgId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumUserTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional().nullable(),
  in: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  notIn: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTypeNullableFilterSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationCountOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationMinOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMembershipRoleFilterSchema: z.ZodType<Prisma.EnumMembershipRoleFilter> = z.object({
  equals: z.lazy(() => MembershipRoleSchema).optional(),
  in: z.union([ z.lazy(() => MembershipRoleSchema).array(),z.lazy(() => MembershipRoleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => MembershipRoleSchema).array(),z.lazy(() => MembershipRoleSchema) ]).optional(),
  not: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => NestedEnumMembershipRoleFilterSchema) ]).optional(),
}).strict();

export const MembershipUserIdOrganizationIdCompoundUniqueInputSchema: z.ZodType<Prisma.MembershipUserIdOrganizationIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  organizationId: z.string()
}).strict();

export const MembershipCountOrderByAggregateInputSchema: z.ZodType<Prisma.MembershipCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  accepted: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MembershipMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MembershipMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  accepted: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MembershipMinOrderByAggregateInputSchema: z.ZodType<Prisma.MembershipMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  accepted: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMembershipRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMembershipRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MembershipRoleSchema).optional(),
  in: z.union([ z.lazy(() => MembershipRoleSchema).array(),z.lazy(() => MembershipRoleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => MembershipRoleSchema).array(),z.lazy(() => MembershipRoleSchema) ]).optional(),
  not: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => NestedEnumMembershipRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMembershipRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMembershipRoleFilterSchema).optional()
}).strict();

export const EnumCandidateStatusFilterSchema: z.ZodType<Prisma.EnumCandidateStatusFilter> = z.object({
  equals: z.lazy(() => CandidateStatusSchema).optional(),
  in: z.union([ z.lazy(() => CandidateStatusSchema).array(),z.lazy(() => CandidateStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => CandidateStatusSchema).array(),z.lazy(() => CandidateStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => NestedEnumCandidateStatusFilterSchema) ]).optional(),
}).strict();

export const AssessmentSessionListRelationFilterSchema: z.ZodType<Prisma.AssessmentSessionListRelationFilter> = z.object({
  every: z.lazy(() => AssessmentSessionWhereInputSchema).optional(),
  some: z.lazy(() => AssessmentSessionWhereInputSchema).optional(),
  none: z.lazy(() => AssessmentSessionWhereInputSchema).optional()
}).strict();

export const ContributionListRelationFilterSchema: z.ZodType<Prisma.ContributionListRelationFilter> = z.object({
  every: z.lazy(() => ContributionWhereInputSchema).optional(),
  some: z.lazy(() => ContributionWhereInputSchema).optional(),
  none: z.lazy(() => ContributionWhereInputSchema).optional()
}).strict();

export const SubmissionListRelationFilterSchema: z.ZodType<Prisma.SubmissionListRelationFilter> = z.object({
  every: z.lazy(() => SubmissionWhereInputSchema).optional(),
  some: z.lazy(() => SubmissionWhereInputSchema).optional(),
  none: z.lazy(() => SubmissionWhereInputSchema).optional()
}).strict();

export const AssessmentSessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AssessmentSessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContributionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContributionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubmissionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubmissionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CandidateIdEmailOrganizationIdCompoundUniqueInputSchema: z.ZodType<Prisma.CandidateIdEmailOrganizationIdCompoundUniqueInput> = z.object({
  id: z.string(),
  email: z.string(),
  organizationId: z.string()
}).strict();

export const CandidateCountOrderByAggregateInputSchema: z.ZodType<Prisma.CandidateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ghUsername: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CandidateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CandidateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ghUsername: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CandidateMinOrderByAggregateInputSchema: z.ZodType<Prisma.CandidateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ghUsername: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumCandidateStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCandidateStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CandidateStatusSchema).optional(),
  in: z.union([ z.lazy(() => CandidateStatusSchema).array(),z.lazy(() => CandidateStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => CandidateStatusSchema).array(),z.lazy(() => CandidateStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => NestedEnumCandidateStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCandidateStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCandidateStatusFilterSchema).optional()
}).strict();

export const EnumAssessmentStatusFilterSchema: z.ZodType<Prisma.EnumAssessmentStatusFilter> = z.object({
  equals: z.lazy(() => AssessmentStatusSchema).optional(),
  in: z.union([ z.lazy(() => AssessmentStatusSchema).array(),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AssessmentStatusSchema).array(),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => NestedEnumAssessmentStatusFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const EnumVisibilityFilterSchema: z.ZodType<Prisma.EnumVisibilityFilter> = z.object({
  equals: z.lazy(() => VisibilitySchema).optional(),
  in: z.union([ z.lazy(() => VisibilitySchema).array(),z.lazy(() => VisibilitySchema) ]).optional(),
  notIn: z.union([ z.lazy(() => VisibilitySchema).array(),z.lazy(() => VisibilitySchema) ]).optional(),
  not: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => NestedEnumVisibilityFilterSchema) ]).optional(),
}).strict();

export const AssessmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.AssessmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  ghIssuesQuerySeach: z.lazy(() => SortOrderSchema).optional(),
  evaluationPeriod: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  visibility: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AssessmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AssessmentAvgOrderByAggregateInput> = z.object({
  evaluationPeriod: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AssessmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AssessmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  ghIssuesQuerySeach: z.lazy(() => SortOrderSchema).optional(),
  evaluationPeriod: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  visibility: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AssessmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.AssessmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  ghIssuesQuerySeach: z.lazy(() => SortOrderSchema).optional(),
  evaluationPeriod: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  visibility: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AssessmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.AssessmentSumOrderByAggregateInput> = z.object({
  evaluationPeriod: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAssessmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAssessmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AssessmentStatusSchema).optional(),
  in: z.union([ z.lazy(() => AssessmentStatusSchema).array(),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AssessmentStatusSchema).array(),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => NestedEnumAssessmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAssessmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAssessmentStatusFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const EnumVisibilityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumVisibilityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => VisibilitySchema).optional(),
  in: z.union([ z.lazy(() => VisibilitySchema).array(),z.lazy(() => VisibilitySchema) ]).optional(),
  notIn: z.union([ z.lazy(() => VisibilitySchema).array(),z.lazy(() => VisibilitySchema) ]).optional(),
  not: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => NestedEnumVisibilityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumVisibilityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumVisibilityFilterSchema).optional()
}).strict();

export const EnumAssessmentSessionStatusFilterSchema: z.ZodType<Prisma.EnumAssessmentSessionStatusFilter> = z.object({
  equals: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  in: z.union([ z.lazy(() => AssessmentSessionStatusSchema).array(),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AssessmentSessionStatusSchema).array(),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => NestedEnumAssessmentSessionStatusFilterSchema) ]).optional(),
}).strict();

export const AssessmentRelationFilterSchema: z.ZodType<Prisma.AssessmentRelationFilter> = z.object({
  is: z.lazy(() => AssessmentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AssessmentWhereInputSchema).optional().nullable()
}).strict();

export const AssessmentSessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.AssessmentSessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  finishedAt: z.lazy(() => SortOrderSchema).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AssessmentSessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AssessmentSessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  finishedAt: z.lazy(() => SortOrderSchema).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AssessmentSessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.AssessmentSessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  finishedAt: z.lazy(() => SortOrderSchema).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAssessmentSessionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAssessmentSessionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  in: z.union([ z.lazy(() => AssessmentSessionStatusSchema).array(),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AssessmentSessionStatusSchema).array(),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => NestedEnumAssessmentSessionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAssessmentSessionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAssessmentSessionStatusFilterSchema).optional()
}).strict();

export const EnumSubmissionStateFilterSchema: z.ZodType<Prisma.EnumSubmissionStateFilter> = z.object({
  equals: z.lazy(() => SubmissionStateSchema).optional(),
  in: z.union([ z.lazy(() => SubmissionStateSchema).array(),z.lazy(() => SubmissionStateSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => SubmissionStateSchema).array(),z.lazy(() => SubmissionStateSchema) ]).optional(),
  not: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => NestedEnumSubmissionStateFilterSchema) ]).optional(),
}).strict();

export const AssessmentSessionRelationFilterSchema: z.ZodType<Prisma.AssessmentSessionRelationFilter> = z.object({
  is: z.lazy(() => AssessmentSessionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AssessmentSessionWhereInputSchema).optional().nullable()
}).strict();

export const SubmissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubmissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional(),
  assessmentSessionId: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubmissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubmissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional(),
  assessmentSessionId: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubmissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubmissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  candidateId: z.lazy(() => SortOrderSchema).optional(),
  assessmentSessionId: z.lazy(() => SortOrderSchema).optional(),
  assessmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSubmissionStateWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSubmissionStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubmissionStateSchema).optional(),
  in: z.union([ z.lazy(() => SubmissionStateSchema).array(),z.lazy(() => SubmissionStateSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => SubmissionStateSchema).array(),z.lazy(() => SubmissionStateSchema) ]).optional(),
  not: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => NestedEnumSubmissionStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubmissionStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubmissionStateFilterSchema).optional()
}).strict();

export const EnumContributionTypeFilterSchema: z.ZodType<Prisma.EnumContributionTypeFilter> = z.object({
  equals: z.lazy(() => ContributionTypeSchema).optional(),
  in: z.union([ z.lazy(() => ContributionTypeSchema).array(),z.lazy(() => ContributionTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ContributionTypeSchema).array(),z.lazy(() => ContributionTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => NestedEnumContributionTypeFilterSchema) ]).optional(),
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const SubmissionRelationFilterSchema: z.ZodType<Prisma.SubmissionRelationFilter> = z.object({
  is: z.lazy(() => SubmissionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SubmissionWhereInputSchema).optional().nullable()
}).strict();

export const ContributionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContributionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  submissionId: z.lazy(() => SortOrderSchema).optional(),
  contributorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContributionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContributionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  submissionId: z.lazy(() => SortOrderSchema).optional(),
  contributorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContributionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContributionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  submissionId: z.lazy(() => SortOrderSchema).optional(),
  contributorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumContributionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumContributionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ContributionTypeSchema).optional(),
  in: z.union([ z.lazy(() => ContributionTypeSchema).array(),z.lazy(() => ContributionTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ContributionTypeSchema).array(),z.lazy(() => ContributionTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => NestedEnumContributionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumContributionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumContributionTypeFilterSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AssessmentCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MembershipCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MembershipCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MembershipCreateWithoutUserInputSchema),z.lazy(() => MembershipCreateWithoutUserInputSchema).array(),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembershipCreateOrConnectWithoutUserInputSchema),z.lazy(() => MembershipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembershipCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CandidateCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.CandidateCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional()
}).strict();

export const OrganizationCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutUserInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const CandidateCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateCreateWithoutCreatedByInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CandidateCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AssessmentUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MembershipUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MembershipUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MembershipCreateWithoutUserInputSchema),z.lazy(() => MembershipCreateWithoutUserInputSchema).array(),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembershipCreateOrConnectWithoutUserInputSchema),z.lazy(() => MembershipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembershipCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CandidateUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional()
}).strict();

export const CandidateUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateCreateWithoutCreatedByInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CandidateCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableEnumUserTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumUserTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserTypeSchema).optional().nullable()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AssessmentUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.AssessmentUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => AssessmentUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentScalarWhereInputSchema),z.lazy(() => AssessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MembershipUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MembershipUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembershipCreateWithoutUserInputSchema),z.lazy(() => MembershipCreateWithoutUserInputSchema).array(),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembershipCreateOrConnectWithoutUserInputSchema),z.lazy(() => MembershipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MembershipUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MembershipUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembershipCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MembershipUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MembershipUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MembershipUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MembershipUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MembershipScalarWhereInputSchema),z.lazy(() => MembershipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CandidateUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.CandidateUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => CandidateUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => CandidateUpdateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const OrganizationUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutUserInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => OrganizationUpdateWithoutUserInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const CandidateUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.CandidateUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateCreateWithoutCreatedByInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CandidateUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => CandidateUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CandidateCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => CandidateUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CandidateUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => CandidateUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CandidateScalarWhereInputSchema),z.lazy(() => CandidateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AssessmentUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => AssessmentUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentScalarWhereInputSchema),z.lazy(() => AssessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MembershipUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MembershipUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembershipCreateWithoutUserInputSchema),z.lazy(() => MembershipCreateWithoutUserInputSchema).array(),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembershipCreateOrConnectWithoutUserInputSchema),z.lazy(() => MembershipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MembershipUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MembershipUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembershipCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MembershipUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MembershipUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MembershipUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MembershipUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MembershipScalarWhereInputSchema),z.lazy(() => MembershipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CandidateUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => CandidateUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CandidateWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => CandidateUpdateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const CandidateUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateCreateWithoutCreatedByInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CandidateUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => CandidateUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CandidateCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => CandidateUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CandidateUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => CandidateUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CandidateScalarWhereInputSchema),z.lazy(() => CandidateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MembershipCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => MembershipCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembershipCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MembershipCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembershipCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AssessmentCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CandidateCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateCreateWithoutOrganizationInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CandidateCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutActiveOrgInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutActiveOrgInputSchema),z.lazy(() => UserCreateWithoutActiveOrgInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutActiveOrgInputSchema),z.lazy(() => UserCreateOrConnectWithoutActiveOrgInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyActiveOrgInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MembershipUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => MembershipCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembershipCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MembershipCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembershipCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AssessmentUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CandidateUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateCreateWithoutOrganizationInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CandidateCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutActiveOrgInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutActiveOrgInputSchema),z.lazy(() => UserCreateWithoutActiveOrgInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutActiveOrgInputSchema),z.lazy(() => UserCreateOrConnectWithoutActiveOrgInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyActiveOrgInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MembershipUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.MembershipUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembershipCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembershipCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MembershipCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MembershipUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MembershipUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembershipCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MembershipUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MembershipUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MembershipUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => MembershipUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MembershipScalarWhereInputSchema),z.lazy(() => MembershipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AssessmentUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.AssessmentUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => AssessmentUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentScalarWhereInputSchema),z.lazy(() => AssessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CandidateUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.CandidateUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateCreateWithoutOrganizationInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CandidateUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => CandidateUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CandidateCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => CandidateUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CandidateUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => CandidateUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CandidateScalarWhereInputSchema),z.lazy(() => CandidateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutActiveOrgNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutActiveOrgNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutActiveOrgInputSchema),z.lazy(() => UserCreateWithoutActiveOrgInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutActiveOrgInputSchema),z.lazy(() => UserCreateOrConnectWithoutActiveOrgInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutActiveOrgInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutActiveOrgInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyActiveOrgInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutActiveOrgInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutActiveOrgInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutActiveOrgInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutActiveOrgInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MembershipUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.MembershipUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembershipCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MembershipCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MembershipCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MembershipUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MembershipUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MembershipCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MembershipWhereUniqueInputSchema),z.lazy(() => MembershipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MembershipUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MembershipUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MembershipUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => MembershipUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MembershipScalarWhereInputSchema),z.lazy(() => MembershipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AssessmentUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => AssessmentUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentScalarWhereInputSchema),z.lazy(() => AssessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CandidateUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateCreateWithoutOrganizationInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CandidateUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => CandidateUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CandidateCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => CandidateUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CandidateUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => CandidateUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CandidateScalarWhereInputSchema),z.lazy(() => CandidateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutActiveOrgNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutActiveOrgNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutActiveOrgInputSchema),z.lazy(() => UserCreateWithoutActiveOrgInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutActiveOrgInputSchema),z.lazy(() => UserCreateOrConnectWithoutActiveOrgInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutActiveOrgInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutActiveOrgInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyActiveOrgInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutActiveOrgInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutActiveOrgInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutActiveOrgInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutActiveOrgInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrganizationCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutMembershipsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMembershipsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembershipsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMembershipsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumMembershipRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMembershipRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MembershipRoleSchema).optional()
}).strict();

export const OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutMembershipsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembershipsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMembershipsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMembershipsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMembershipsInputSchema),z.lazy(() => UserUpdateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMembershipsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCandidateInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCandidateInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCandidateInputSchema),z.lazy(() => UserUncheckedCreateWithoutCandidateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCandidateInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AssessmentSessionCreateNestedManyWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionCreateNestedManyWithoutCandidateInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema).array(),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentSessionCreateOrConnectWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionCreateOrConnectWithoutCandidateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentSessionCreateManyCandidateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrganizationCreateNestedOneWithoutCandidatesInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutCandidatesInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutCandidatesInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutCandidatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutCandidatesInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const AssessmentCreateNestedManyWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentCreateNestedManyWithoutCandidatesInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutCandidatesInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutCandidatesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCreatedCandidatesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedCandidatesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedCandidatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedCandidatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedCandidatesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ContributionCreateNestedManyWithoutContributorInputSchema: z.ZodType<Prisma.ContributionCreateNestedManyWithoutContributorInput> = z.object({
  create: z.union([ z.lazy(() => ContributionCreateWithoutContributorInputSchema),z.lazy(() => ContributionCreateWithoutContributorInputSchema).array(),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContributionCreateOrConnectWithoutContributorInputSchema),z.lazy(() => ContributionCreateOrConnectWithoutContributorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContributionCreateManyContributorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubmissionCreateNestedManyWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionCreateNestedManyWithoutCandidateInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionCreateWithoutCandidateInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutCandidateInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutCandidateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManyCandidateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AssessmentSessionUncheckedCreateNestedManyWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedCreateNestedManyWithoutCandidateInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema).array(),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentSessionCreateOrConnectWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionCreateOrConnectWithoutCandidateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentSessionCreateManyCandidateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AssessmentUncheckedCreateNestedManyWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentUncheckedCreateNestedManyWithoutCandidatesInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutCandidatesInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutCandidatesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContributionUncheckedCreateNestedManyWithoutContributorInputSchema: z.ZodType<Prisma.ContributionUncheckedCreateNestedManyWithoutContributorInput> = z.object({
  create: z.union([ z.lazy(() => ContributionCreateWithoutContributorInputSchema),z.lazy(() => ContributionCreateWithoutContributorInputSchema).array(),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContributionCreateOrConnectWithoutContributorInputSchema),z.lazy(() => ContributionCreateOrConnectWithoutContributorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContributionCreateManyContributorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubmissionUncheckedCreateNestedManyWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionUncheckedCreateNestedManyWithoutCandidateInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionCreateWithoutCandidateInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutCandidateInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutCandidateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManyCandidateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumCandidateStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCandidateStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CandidateStatusSchema).optional()
}).strict();

export const UserUpdateOneWithoutCandidateNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutCandidateNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCandidateInputSchema),z.lazy(() => UserUncheckedCreateWithoutCandidateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCandidateInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCandidateInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCandidateInputSchema),z.lazy(() => UserUpdateWithoutCandidateInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCandidateInputSchema) ]).optional(),
}).strict();

export const AssessmentSessionUpdateManyWithoutCandidateNestedInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateManyWithoutCandidateNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema).array(),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentSessionCreateOrConnectWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionCreateOrConnectWithoutCandidateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentSessionUpsertWithWhereUniqueWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUpsertWithWhereUniqueWithoutCandidateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentSessionCreateManyCandidateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentSessionUpdateWithWhereUniqueWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUpdateWithWhereUniqueWithoutCandidateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentSessionUpdateManyWithWhereWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUpdateManyWithWhereWithoutCandidateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentSessionScalarWhereInputSchema),z.lazy(() => AssessmentSessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrganizationUpdateOneWithoutCandidatesNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneWithoutCandidatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutCandidatesInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutCandidatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutCandidatesInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutCandidatesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutCandidatesInputSchema),z.lazy(() => OrganizationUpdateWithoutCandidatesInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutCandidatesInputSchema) ]).optional(),
}).strict();

export const AssessmentUpdateManyWithoutCandidatesNestedInputSchema: z.ZodType<Prisma.AssessmentUpdateManyWithoutCandidatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutCandidatesInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutCandidatesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutCandidatesInputSchema),z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutCandidatesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutCandidatesInputSchema),z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutCandidatesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentUpdateManyWithWhereWithoutCandidatesInputSchema),z.lazy(() => AssessmentUpdateManyWithWhereWithoutCandidatesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentScalarWhereInputSchema),z.lazy(() => AssessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutCreatedCandidatesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutCreatedCandidatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedCandidatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedCandidatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedCandidatesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedCandidatesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedCandidatesInputSchema),z.lazy(() => UserUpdateWithoutCreatedCandidatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedCandidatesInputSchema) ]).optional(),
}).strict();

export const ContributionUpdateManyWithoutContributorNestedInputSchema: z.ZodType<Prisma.ContributionUpdateManyWithoutContributorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContributionCreateWithoutContributorInputSchema),z.lazy(() => ContributionCreateWithoutContributorInputSchema).array(),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContributionCreateOrConnectWithoutContributorInputSchema),z.lazy(() => ContributionCreateOrConnectWithoutContributorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContributionUpsertWithWhereUniqueWithoutContributorInputSchema),z.lazy(() => ContributionUpsertWithWhereUniqueWithoutContributorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContributionCreateManyContributorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContributionUpdateWithWhereUniqueWithoutContributorInputSchema),z.lazy(() => ContributionUpdateWithWhereUniqueWithoutContributorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContributionUpdateManyWithWhereWithoutContributorInputSchema),z.lazy(() => ContributionUpdateManyWithWhereWithoutContributorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContributionScalarWhereInputSchema),z.lazy(() => ContributionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubmissionUpdateManyWithoutCandidateNestedInputSchema: z.ZodType<Prisma.SubmissionUpdateManyWithoutCandidateNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionCreateWithoutCandidateInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutCandidateInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutCandidateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutCandidateInputSchema),z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutCandidateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManyCandidateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutCandidateInputSchema),z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutCandidateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubmissionUpdateManyWithWhereWithoutCandidateInputSchema),z.lazy(() => SubmissionUpdateManyWithWhereWithoutCandidateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubmissionScalarWhereInputSchema),z.lazy(() => SubmissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AssessmentSessionUncheckedUpdateManyWithoutCandidateNestedInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedUpdateManyWithoutCandidateNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema).array(),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentSessionCreateOrConnectWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionCreateOrConnectWithoutCandidateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentSessionUpsertWithWhereUniqueWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUpsertWithWhereUniqueWithoutCandidateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentSessionCreateManyCandidateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentSessionUpdateWithWhereUniqueWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUpdateWithWhereUniqueWithoutCandidateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentSessionUpdateManyWithWhereWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUpdateManyWithWhereWithoutCandidateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentSessionScalarWhereInputSchema),z.lazy(() => AssessmentSessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AssessmentUncheckedUpdateManyWithoutCandidatesNestedInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateManyWithoutCandidatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema).array(),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentCreateOrConnectWithoutCandidatesInputSchema),z.lazy(() => AssessmentCreateOrConnectWithoutCandidatesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutCandidatesInputSchema),z.lazy(() => AssessmentUpsertWithWhereUniqueWithoutCandidatesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentWhereUniqueInputSchema),z.lazy(() => AssessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutCandidatesInputSchema),z.lazy(() => AssessmentUpdateWithWhereUniqueWithoutCandidatesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentUpdateManyWithWhereWithoutCandidatesInputSchema),z.lazy(() => AssessmentUpdateManyWithWhereWithoutCandidatesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentScalarWhereInputSchema),z.lazy(() => AssessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContributionUncheckedUpdateManyWithoutContributorNestedInputSchema: z.ZodType<Prisma.ContributionUncheckedUpdateManyWithoutContributorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContributionCreateWithoutContributorInputSchema),z.lazy(() => ContributionCreateWithoutContributorInputSchema).array(),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContributionCreateOrConnectWithoutContributorInputSchema),z.lazy(() => ContributionCreateOrConnectWithoutContributorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContributionUpsertWithWhereUniqueWithoutContributorInputSchema),z.lazy(() => ContributionUpsertWithWhereUniqueWithoutContributorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContributionCreateManyContributorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContributionUpdateWithWhereUniqueWithoutContributorInputSchema),z.lazy(() => ContributionUpdateWithWhereUniqueWithoutContributorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContributionUpdateManyWithWhereWithoutContributorInputSchema),z.lazy(() => ContributionUpdateManyWithWhereWithoutContributorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContributionScalarWhereInputSchema),z.lazy(() => ContributionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubmissionUncheckedUpdateManyWithoutCandidateNestedInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateManyWithoutCandidateNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionCreateWithoutCandidateInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutCandidateInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutCandidateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutCandidateInputSchema),z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutCandidateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManyCandidateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutCandidateInputSchema),z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutCandidateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubmissionUpdateManyWithWhereWithoutCandidateInputSchema),z.lazy(() => SubmissionUpdateManyWithWhereWithoutCandidateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubmissionScalarWhereInputSchema),z.lazy(() => SubmissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCreatedAssessmentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedAssessmentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAssessmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAssessmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedAssessmentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const OrganizationCreateNestedOneWithoutAssessmentsInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutAssessmentsInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutAssessmentsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutAssessmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutAssessmentsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const CandidateCreateNestedManyWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateCreateNestedManyWithoutAssessmentsInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutAssessmentsInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutAssessmentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AssessmentSessionCreateNestedManyWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionCreateNestedManyWithoutAssessmentInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema).array(),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentSessionCreateOrConnectWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionCreateOrConnectWithoutAssessmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentSessionCreateManyAssessmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubmissionCreateNestedManyWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionCreateNestedManyWithoutAssessmentInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutAssessmentInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutAssessmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManyAssessmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CandidateUncheckedCreateNestedManyWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateNestedManyWithoutAssessmentsInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutAssessmentsInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutAssessmentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AssessmentSessionUncheckedCreateNestedManyWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedCreateNestedManyWithoutAssessmentInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema).array(),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentSessionCreateOrConnectWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionCreateOrConnectWithoutAssessmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentSessionCreateManyAssessmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubmissionUncheckedCreateNestedManyWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionUncheckedCreateNestedManyWithoutAssessmentInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutAssessmentInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutAssessmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManyAssessmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumAssessmentStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAssessmentStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AssessmentStatusSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumVisibilityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumVisibilityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => VisibilitySchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutCreatedAssessmentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCreatedAssessmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAssessmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAssessmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedAssessmentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedAssessmentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedAssessmentsInputSchema),z.lazy(() => UserUpdateWithoutCreatedAssessmentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedAssessmentsInputSchema) ]).optional(),
}).strict();

export const OrganizationUpdateOneRequiredWithoutAssessmentsNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutAssessmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutAssessmentsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutAssessmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutAssessmentsInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutAssessmentsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutAssessmentsInputSchema),z.lazy(() => OrganizationUpdateWithoutAssessmentsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutAssessmentsInputSchema) ]).optional(),
}).strict();

export const CandidateUpdateManyWithoutAssessmentsNestedInputSchema: z.ZodType<Prisma.CandidateUpdateManyWithoutAssessmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutAssessmentsInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutAssessmentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CandidateUpsertWithWhereUniqueWithoutAssessmentsInputSchema),z.lazy(() => CandidateUpsertWithWhereUniqueWithoutAssessmentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateWithWhereUniqueWithoutAssessmentsInputSchema),z.lazy(() => CandidateUpdateWithWhereUniqueWithoutAssessmentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CandidateUpdateManyWithWhereWithoutAssessmentsInputSchema),z.lazy(() => CandidateUpdateManyWithWhereWithoutAssessmentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CandidateScalarWhereInputSchema),z.lazy(() => CandidateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AssessmentSessionUpdateManyWithoutAssessmentNestedInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateManyWithoutAssessmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema).array(),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentSessionCreateOrConnectWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionCreateOrConnectWithoutAssessmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentSessionUpsertWithWhereUniqueWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUpsertWithWhereUniqueWithoutAssessmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentSessionCreateManyAssessmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentSessionUpdateWithWhereUniqueWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUpdateWithWhereUniqueWithoutAssessmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentSessionUpdateManyWithWhereWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUpdateManyWithWhereWithoutAssessmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentSessionScalarWhereInputSchema),z.lazy(() => AssessmentSessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubmissionUpdateManyWithoutAssessmentNestedInputSchema: z.ZodType<Prisma.SubmissionUpdateManyWithoutAssessmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutAssessmentInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutAssessmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutAssessmentInputSchema),z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutAssessmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManyAssessmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutAssessmentInputSchema),z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutAssessmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubmissionUpdateManyWithWhereWithoutAssessmentInputSchema),z.lazy(() => SubmissionUpdateManyWithWhereWithoutAssessmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubmissionScalarWhereInputSchema),z.lazy(() => SubmissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CandidateUncheckedUpdateManyWithoutAssessmentsNestedInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateManyWithoutAssessmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema).array(),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CandidateCreateOrConnectWithoutAssessmentsInputSchema),z.lazy(() => CandidateCreateOrConnectWithoutAssessmentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CandidateUpsertWithWhereUniqueWithoutAssessmentsInputSchema),z.lazy(() => CandidateUpsertWithWhereUniqueWithoutAssessmentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CandidateWhereUniqueInputSchema),z.lazy(() => CandidateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateWithWhereUniqueWithoutAssessmentsInputSchema),z.lazy(() => CandidateUpdateWithWhereUniqueWithoutAssessmentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CandidateUpdateManyWithWhereWithoutAssessmentsInputSchema),z.lazy(() => CandidateUpdateManyWithWhereWithoutAssessmentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CandidateScalarWhereInputSchema),z.lazy(() => CandidateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AssessmentSessionUncheckedUpdateManyWithoutAssessmentNestedInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedUpdateManyWithoutAssessmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema).array(),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssessmentSessionCreateOrConnectWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionCreateOrConnectWithoutAssessmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssessmentSessionUpsertWithWhereUniqueWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUpsertWithWhereUniqueWithoutAssessmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssessmentSessionCreateManyAssessmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssessmentSessionWhereUniqueInputSchema),z.lazy(() => AssessmentSessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssessmentSessionUpdateWithWhereUniqueWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUpdateWithWhereUniqueWithoutAssessmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssessmentSessionUpdateManyWithWhereWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUpdateManyWithWhereWithoutAssessmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssessmentSessionScalarWhereInputSchema),z.lazy(() => AssessmentSessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubmissionUncheckedUpdateManyWithoutAssessmentNestedInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateManyWithoutAssessmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutAssessmentInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutAssessmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutAssessmentInputSchema),z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutAssessmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManyAssessmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutAssessmentInputSchema),z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutAssessmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubmissionUpdateManyWithWhereWithoutAssessmentInputSchema),z.lazy(() => SubmissionUpdateManyWithWhereWithoutAssessmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubmissionScalarWhereInputSchema),z.lazy(() => SubmissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AssessmentCreateNestedOneWithoutApplicantSessionsInputSchema: z.ZodType<Prisma.AssessmentCreateNestedOneWithoutApplicantSessionsInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutApplicantSessionsInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutApplicantSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AssessmentCreateOrConnectWithoutApplicantSessionsInputSchema).optional(),
  connect: z.lazy(() => AssessmentWhereUniqueInputSchema).optional()
}).strict();

export const CandidateCreateNestedOneWithoutAssessmentSessionsInputSchema: z.ZodType<Prisma.CandidateCreateNestedOneWithoutAssessmentSessionsInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentSessionsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutAssessmentSessionsInputSchema).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional()
}).strict();

export const SubmissionCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutSessionInputSchema),z.lazy(() => SubmissionCreateWithoutSessionInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutSessionInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubmissionUncheckedCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionUncheckedCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutSessionInputSchema),z.lazy(() => SubmissionCreateWithoutSessionInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutSessionInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAssessmentSessionStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AssessmentSessionStatusSchema).optional()
}).strict();

export const AssessmentUpdateOneRequiredWithoutApplicantSessionsNestedInputSchema: z.ZodType<Prisma.AssessmentUpdateOneRequiredWithoutApplicantSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutApplicantSessionsInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutApplicantSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AssessmentCreateOrConnectWithoutApplicantSessionsInputSchema).optional(),
  upsert: z.lazy(() => AssessmentUpsertWithoutApplicantSessionsInputSchema).optional(),
  connect: z.lazy(() => AssessmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AssessmentUpdateToOneWithWhereWithoutApplicantSessionsInputSchema),z.lazy(() => AssessmentUpdateWithoutApplicantSessionsInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutApplicantSessionsInputSchema) ]).optional(),
}).strict();

export const CandidateUpdateOneRequiredWithoutAssessmentSessionsNestedInputSchema: z.ZodType<Prisma.CandidateUpdateOneRequiredWithoutAssessmentSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentSessionsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutAssessmentSessionsInputSchema).optional(),
  upsert: z.lazy(() => CandidateUpsertWithoutAssessmentSessionsInputSchema).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateToOneWithWhereWithoutAssessmentSessionsInputSchema),z.lazy(() => CandidateUpdateWithoutAssessmentSessionsInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutAssessmentSessionsInputSchema) ]).optional(),
}).strict();

export const SubmissionUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.SubmissionUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutSessionInputSchema),z.lazy(() => SubmissionCreateWithoutSessionInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutSessionInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManySessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubmissionUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => SubmissionUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubmissionScalarWhereInputSchema),z.lazy(() => SubmissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubmissionUncheckedUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutSessionInputSchema),z.lazy(() => SubmissionCreateWithoutSessionInputSchema).array(),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SubmissionCreateOrConnectWithoutSessionInputSchema),z.lazy(() => SubmissionCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => SubmissionUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SubmissionCreateManySessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SubmissionWhereUniqueInputSchema),z.lazy(() => SubmissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => SubmissionUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SubmissionUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => SubmissionUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SubmissionScalarWhereInputSchema),z.lazy(() => SubmissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContributionCreateNestedManyWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionCreateNestedManyWithoutSubmissionInput> = z.object({
  create: z.union([ z.lazy(() => ContributionCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionCreateWithoutSubmissionInputSchema).array(),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContributionCreateOrConnectWithoutSubmissionInputSchema),z.lazy(() => ContributionCreateOrConnectWithoutSubmissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContributionCreateManySubmissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CandidateCreateNestedOneWithoutSubmissionInputSchema: z.ZodType<Prisma.CandidateCreateNestedOneWithoutSubmissionInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutSubmissionInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutSubmissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutSubmissionInputSchema).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional()
}).strict();

export const AssessmentSessionCreateNestedOneWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentSessionCreateNestedOneWithoutSubmissionInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutSubmissionInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutSubmissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AssessmentSessionCreateOrConnectWithoutSubmissionInputSchema).optional(),
  connect: z.lazy(() => AssessmentSessionWhereUniqueInputSchema).optional()
}).strict();

export const AssessmentCreateNestedOneWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentCreateNestedOneWithoutSubmissionInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutSubmissionInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutSubmissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AssessmentCreateOrConnectWithoutSubmissionInputSchema).optional(),
  connect: z.lazy(() => AssessmentWhereUniqueInputSchema).optional()
}).strict();

export const ContributionUncheckedCreateNestedManyWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionUncheckedCreateNestedManyWithoutSubmissionInput> = z.object({
  create: z.union([ z.lazy(() => ContributionCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionCreateWithoutSubmissionInputSchema).array(),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContributionCreateOrConnectWithoutSubmissionInputSchema),z.lazy(() => ContributionCreateOrConnectWithoutSubmissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContributionCreateManySubmissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumSubmissionStateFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSubmissionStateFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SubmissionStateSchema).optional()
}).strict();

export const ContributionUpdateManyWithoutSubmissionNestedInputSchema: z.ZodType<Prisma.ContributionUpdateManyWithoutSubmissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContributionCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionCreateWithoutSubmissionInputSchema).array(),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContributionCreateOrConnectWithoutSubmissionInputSchema),z.lazy(() => ContributionCreateOrConnectWithoutSubmissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContributionUpsertWithWhereUniqueWithoutSubmissionInputSchema),z.lazy(() => ContributionUpsertWithWhereUniqueWithoutSubmissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContributionCreateManySubmissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContributionUpdateWithWhereUniqueWithoutSubmissionInputSchema),z.lazy(() => ContributionUpdateWithWhereUniqueWithoutSubmissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContributionUpdateManyWithWhereWithoutSubmissionInputSchema),z.lazy(() => ContributionUpdateManyWithWhereWithoutSubmissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContributionScalarWhereInputSchema),z.lazy(() => ContributionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CandidateUpdateOneRequiredWithoutSubmissionNestedInputSchema: z.ZodType<Prisma.CandidateUpdateOneRequiredWithoutSubmissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutSubmissionInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutSubmissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutSubmissionInputSchema).optional(),
  upsert: z.lazy(() => CandidateUpsertWithoutSubmissionInputSchema).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateToOneWithWhereWithoutSubmissionInputSchema),z.lazy(() => CandidateUpdateWithoutSubmissionInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutSubmissionInputSchema) ]).optional(),
}).strict();

export const AssessmentSessionUpdateOneRequiredWithoutSubmissionNestedInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateOneRequiredWithoutSubmissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutSubmissionInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutSubmissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AssessmentSessionCreateOrConnectWithoutSubmissionInputSchema).optional(),
  upsert: z.lazy(() => AssessmentSessionUpsertWithoutSubmissionInputSchema).optional(),
  connect: z.lazy(() => AssessmentSessionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AssessmentSessionUpdateToOneWithWhereWithoutSubmissionInputSchema),z.lazy(() => AssessmentSessionUpdateWithoutSubmissionInputSchema),z.lazy(() => AssessmentSessionUncheckedUpdateWithoutSubmissionInputSchema) ]).optional(),
}).strict();

export const AssessmentUpdateOneRequiredWithoutSubmissionNestedInputSchema: z.ZodType<Prisma.AssessmentUpdateOneRequiredWithoutSubmissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssessmentCreateWithoutSubmissionInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutSubmissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AssessmentCreateOrConnectWithoutSubmissionInputSchema).optional(),
  upsert: z.lazy(() => AssessmentUpsertWithoutSubmissionInputSchema).optional(),
  connect: z.lazy(() => AssessmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AssessmentUpdateToOneWithWhereWithoutSubmissionInputSchema),z.lazy(() => AssessmentUpdateWithoutSubmissionInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutSubmissionInputSchema) ]).optional(),
}).strict();

export const ContributionUncheckedUpdateManyWithoutSubmissionNestedInputSchema: z.ZodType<Prisma.ContributionUncheckedUpdateManyWithoutSubmissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContributionCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionCreateWithoutSubmissionInputSchema).array(),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContributionCreateOrConnectWithoutSubmissionInputSchema),z.lazy(() => ContributionCreateOrConnectWithoutSubmissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContributionUpsertWithWhereUniqueWithoutSubmissionInputSchema),z.lazy(() => ContributionUpsertWithWhereUniqueWithoutSubmissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContributionCreateManySubmissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContributionWhereUniqueInputSchema),z.lazy(() => ContributionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContributionUpdateWithWhereUniqueWithoutSubmissionInputSchema),z.lazy(() => ContributionUpdateWithWhereUniqueWithoutSubmissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContributionUpdateManyWithWhereWithoutSubmissionInputSchema),z.lazy(() => ContributionUpdateManyWithWhereWithoutSubmissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContributionScalarWhereInputSchema),z.lazy(() => ContributionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubmissionCreateNestedOneWithoutContributionsInputSchema: z.ZodType<Prisma.SubmissionCreateNestedOneWithoutContributionsInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutContributionsInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutContributionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubmissionCreateOrConnectWithoutContributionsInputSchema).optional(),
  connect: z.lazy(() => SubmissionWhereUniqueInputSchema).optional()
}).strict();

export const CandidateCreateNestedOneWithoutContributionsInputSchema: z.ZodType<Prisma.CandidateCreateNestedOneWithoutContributionsInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutContributionsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutContributionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutContributionsInputSchema).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional()
}).strict();

export const EnumContributionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumContributionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ContributionTypeSchema).optional()
}).strict();

export const SubmissionUpdateOneWithoutContributionsNestedInputSchema: z.ZodType<Prisma.SubmissionUpdateOneWithoutContributionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubmissionCreateWithoutContributionsInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutContributionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubmissionCreateOrConnectWithoutContributionsInputSchema).optional(),
  upsert: z.lazy(() => SubmissionUpsertWithoutContributionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SubmissionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SubmissionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SubmissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SubmissionUpdateToOneWithWhereWithoutContributionsInputSchema),z.lazy(() => SubmissionUpdateWithoutContributionsInputSchema),z.lazy(() => SubmissionUncheckedUpdateWithoutContributionsInputSchema) ]).optional(),
}).strict();

export const CandidateUpdateOneRequiredWithoutContributionsNestedInputSchema: z.ZodType<Prisma.CandidateUpdateOneRequiredWithoutContributionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CandidateCreateWithoutContributionsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutContributionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CandidateCreateOrConnectWithoutContributionsInputSchema).optional(),
  upsert: z.lazy(() => CandidateUpsertWithoutContributionsInputSchema).optional(),
  connect: z.lazy(() => CandidateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CandidateUpdateToOneWithWhereWithoutContributionsInputSchema),z.lazy(() => CandidateUpdateWithoutContributionsInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutContributionsInputSchema) ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUserTypeNullableFilterSchema: z.ZodType<Prisma.NestedEnumUserTypeNullableFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional().nullable(),
  in: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  notIn: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumUserTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional().nullable(),
  in: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  notIn: z.union([ z.lazy(() => UserTypeSchema).array(),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTypeNullableFilterSchema).optional()
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedEnumMembershipRoleFilterSchema: z.ZodType<Prisma.NestedEnumMembershipRoleFilter> = z.object({
  equals: z.lazy(() => MembershipRoleSchema).optional(),
  in: z.union([ z.lazy(() => MembershipRoleSchema).array(),z.lazy(() => MembershipRoleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => MembershipRoleSchema).array(),z.lazy(() => MembershipRoleSchema) ]).optional(),
  not: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => NestedEnumMembershipRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumMembershipRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMembershipRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MembershipRoleSchema).optional(),
  in: z.union([ z.lazy(() => MembershipRoleSchema).array(),z.lazy(() => MembershipRoleSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => MembershipRoleSchema).array(),z.lazy(() => MembershipRoleSchema) ]).optional(),
  not: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => NestedEnumMembershipRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMembershipRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMembershipRoleFilterSchema).optional()
}).strict();

export const NestedEnumCandidateStatusFilterSchema: z.ZodType<Prisma.NestedEnumCandidateStatusFilter> = z.object({
  equals: z.lazy(() => CandidateStatusSchema).optional(),
  in: z.union([ z.lazy(() => CandidateStatusSchema).array(),z.lazy(() => CandidateStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => CandidateStatusSchema).array(),z.lazy(() => CandidateStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => NestedEnumCandidateStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumCandidateStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCandidateStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CandidateStatusSchema).optional(),
  in: z.union([ z.lazy(() => CandidateStatusSchema).array(),z.lazy(() => CandidateStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => CandidateStatusSchema).array(),z.lazy(() => CandidateStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => NestedEnumCandidateStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCandidateStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCandidateStatusFilterSchema).optional()
}).strict();

export const NestedEnumAssessmentStatusFilterSchema: z.ZodType<Prisma.NestedEnumAssessmentStatusFilter> = z.object({
  equals: z.lazy(() => AssessmentStatusSchema).optional(),
  in: z.union([ z.lazy(() => AssessmentStatusSchema).array(),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AssessmentStatusSchema).array(),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => NestedEnumAssessmentStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumVisibilityFilterSchema: z.ZodType<Prisma.NestedEnumVisibilityFilter> = z.object({
  equals: z.lazy(() => VisibilitySchema).optional(),
  in: z.union([ z.lazy(() => VisibilitySchema).array(),z.lazy(() => VisibilitySchema) ]).optional(),
  notIn: z.union([ z.lazy(() => VisibilitySchema).array(),z.lazy(() => VisibilitySchema) ]).optional(),
  not: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => NestedEnumVisibilityFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAssessmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAssessmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AssessmentStatusSchema).optional(),
  in: z.union([ z.lazy(() => AssessmentStatusSchema).array(),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AssessmentStatusSchema).array(),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => NestedEnumAssessmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAssessmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAssessmentStatusFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumVisibilityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumVisibilityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => VisibilitySchema).optional(),
  in: z.union([ z.lazy(() => VisibilitySchema).array(),z.lazy(() => VisibilitySchema) ]).optional(),
  notIn: z.union([ z.lazy(() => VisibilitySchema).array(),z.lazy(() => VisibilitySchema) ]).optional(),
  not: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => NestedEnumVisibilityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumVisibilityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumVisibilityFilterSchema).optional()
}).strict();

export const NestedEnumAssessmentSessionStatusFilterSchema: z.ZodType<Prisma.NestedEnumAssessmentSessionStatusFilter> = z.object({
  equals: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  in: z.union([ z.lazy(() => AssessmentSessionStatusSchema).array(),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AssessmentSessionStatusSchema).array(),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => NestedEnumAssessmentSessionStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAssessmentSessionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAssessmentSessionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  in: z.union([ z.lazy(() => AssessmentSessionStatusSchema).array(),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => AssessmentSessionStatusSchema).array(),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => NestedEnumAssessmentSessionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAssessmentSessionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAssessmentSessionStatusFilterSchema).optional()
}).strict();

export const NestedEnumSubmissionStateFilterSchema: z.ZodType<Prisma.NestedEnumSubmissionStateFilter> = z.object({
  equals: z.lazy(() => SubmissionStateSchema).optional(),
  in: z.union([ z.lazy(() => SubmissionStateSchema).array(),z.lazy(() => SubmissionStateSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => SubmissionStateSchema).array(),z.lazy(() => SubmissionStateSchema) ]).optional(),
  not: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => NestedEnumSubmissionStateFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSubmissionStateWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSubmissionStateWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubmissionStateSchema).optional(),
  in: z.union([ z.lazy(() => SubmissionStateSchema).array(),z.lazy(() => SubmissionStateSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => SubmissionStateSchema).array(),z.lazy(() => SubmissionStateSchema) ]).optional(),
  not: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => NestedEnumSubmissionStateWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubmissionStateFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubmissionStateFilterSchema).optional()
}).strict();

export const NestedEnumContributionTypeFilterSchema: z.ZodType<Prisma.NestedEnumContributionTypeFilter> = z.object({
  equals: z.lazy(() => ContributionTypeSchema).optional(),
  in: z.union([ z.lazy(() => ContributionTypeSchema).array(),z.lazy(() => ContributionTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ContributionTypeSchema).array(),z.lazy(() => ContributionTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => NestedEnumContributionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumContributionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumContributionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ContributionTypeSchema).optional(),
  in: z.union([ z.lazy(() => ContributionTypeSchema).array(),z.lazy(() => ContributionTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ContributionTypeSchema).array(),z.lazy(() => ContributionTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => NestedEnumContributionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumContributionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumContributionTypeFilterSchema).optional()
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutUserInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  activeOrgId: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneWithoutUserNestedInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutUserInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  activeOrgId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneWithoutUserNestedInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AssessmentCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentCreateWithoutCreatedByInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutAssessmentsInputSchema),
  candidates: z.lazy(() => CandidateCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutAssessmentInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  organizationId: z.string(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const AssessmentCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.AssessmentCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AssessmentCreateManyCreatedByInputSchema),z.lazy(() => AssessmentCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MembershipCreateWithoutUserInputSchema: z.ZodType<Prisma.MembershipCreateWithoutUserInput> = z.object({
  accepted: z.boolean().optional(),
  role: z.lazy(() => MembershipRoleSchema),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const MembershipUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MembershipUncheckedCreateWithoutUserInput> = z.object({
  accepted: z.boolean().optional(),
  role: z.lazy(() => MembershipRoleSchema),
  organizationId: z.string()
}).strict();

export const MembershipCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MembershipCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => MembershipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MembershipCreateWithoutUserInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MembershipCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MembershipCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MembershipCreateManyUserInputSchema),z.lazy(() => MembershipCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CandidateCreateWithoutUserInputSchema: z.ZodType<Prisma.CandidateCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutCandidateInputSchema).optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutCandidatesInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutCandidatesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  organizationId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string().optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CandidateCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CandidateCreateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const OrganizationCreateWithoutUserInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => MembershipCreateNestedManyWithoutOrganizationInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutOrganizationInputSchema).optional(),
  candidates: z.lazy(() => CandidateCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutUserInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CandidateCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateCreateWithoutCreatedByInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCandidateInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutCandidateInputSchema).optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutCandidatesInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CandidateCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const CandidateCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.CandidateCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CandidateCreateManyCreatedByInputSchema),z.lazy(() => CandidateCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AssessmentUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AssessmentUpdateWithoutCreatedByInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCreatedByInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const AssessmentUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AssessmentUpdateWithoutCreatedByInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const AssessmentUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => AssessmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AssessmentUpdateManyMutationInputSchema),z.lazy(() => AssessmentUncheckedUpdateManyWithoutCreatedAssessmentsInputSchema) ]),
}).strict();

export const AssessmentScalarWhereInputSchema: z.ZodType<Prisma.AssessmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AssessmentScalarWhereInputSchema),z.lazy(() => AssessmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssessmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssessmentScalarWhereInputSchema),z.lazy(() => AssessmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumAssessmentStatusFilterSchema),z.lazy(() => AssessmentStatusSchema) ]).optional(),
  createdById: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  ghIssuesQuerySeach: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  evaluationPeriod: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  visibility: z.union([ z.lazy(() => EnumVisibilityFilterSchema),z.lazy(() => VisibilitySchema) ]).optional(),
}).strict();

export const MembershipUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MembershipUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MembershipWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MembershipUpdateWithoutUserInputSchema),z.lazy(() => MembershipUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MembershipCreateWithoutUserInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MembershipUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MembershipUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MembershipWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MembershipUpdateWithoutUserInputSchema),z.lazy(() => MembershipUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const MembershipUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MembershipUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => MembershipScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MembershipUpdateManyMutationInputSchema),z.lazy(() => MembershipUncheckedUpdateManyWithoutMembershipsInputSchema) ]),
}).strict();

export const MembershipScalarWhereInputSchema: z.ZodType<Prisma.MembershipScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MembershipScalarWhereInputSchema),z.lazy(() => MembershipScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembershipScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembershipScalarWhereInputSchema),z.lazy(() => MembershipScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  accepted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  role: z.union([ z.lazy(() => EnumMembershipRoleFilterSchema),z.lazy(() => MembershipRoleSchema) ]).optional(),
  organizationId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const CandidateUpsertWithoutUserInputSchema: z.ZodType<Prisma.CandidateUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => CandidateUpdateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CandidateCreateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => CandidateWhereInputSchema).optional()
}).strict();

export const CandidateUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CandidateUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CandidateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CandidateUpdateWithoutUserInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CandidateUpdateWithoutUserInputSchema: z.ZodType<Prisma.CandidateUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutCandidateNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneWithoutCandidatesNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const OrganizationUpsertWithoutUserInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutUserInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutUserInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutUserInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutUserInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembershipUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembershipUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const CandidateUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CandidateUpdateWithoutCreatedByInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => CandidateCreateWithoutCreatedByInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const CandidateUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CandidateUpdateWithoutCreatedByInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const CandidateUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => CandidateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CandidateUpdateManyMutationInputSchema),z.lazy(() => CandidateUncheckedUpdateManyWithoutCreatedCandidatesInputSchema) ]),
}).strict();

export const CandidateScalarWhereInputSchema: z.ZodType<Prisma.CandidateScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CandidateScalarWhereInputSchema),z.lazy(() => CandidateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CandidateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CandidateScalarWhereInputSchema),z.lazy(() => CandidateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  organizationId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ghUsername: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumCandidateStatusFilterSchema),z.lazy(() => CandidateStatusSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MembershipCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipCreateWithoutOrganizationInput> = z.object({
  accepted: z.boolean().optional(),
  role: z.lazy(() => MembershipRoleSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutMembershipsInputSchema)
}).strict();

export const MembershipUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipUncheckedCreateWithoutOrganizationInput> = z.object({
  userId: z.string(),
  accepted: z.boolean().optional(),
  role: z.lazy(() => MembershipRoleSchema)
}).strict();

export const MembershipCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MembershipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MembershipCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const MembershipCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.MembershipCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MembershipCreateManyOrganizationInputSchema),z.lazy(() => MembershipCreateManyOrganizationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AssessmentCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedAssessmentsInputSchema),
  candidates: z.lazy(() => CandidateCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutAssessmentInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  createdById: z.string(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const AssessmentCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.AssessmentCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AssessmentCreateManyOrganizationInputSchema),z.lazy(() => AssessmentCreateManyOrganizationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CandidateCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCandidateInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutCandidateInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutCandidatesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string().optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CandidateCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const CandidateCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.CandidateCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CandidateCreateManyOrganizationInputSchema),z.lazy(() => CandidateCreateManyOrganizationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserCreateWithoutActiveOrgInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutActiveOrgInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutActiveOrgInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutActiveOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema) ]),
}).strict();

export const UserCreateManyActiveOrgInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyActiveOrgInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyActiveOrgInputSchema),z.lazy(() => UserCreateManyActiveOrgInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MembershipUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MembershipWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MembershipUpdateWithoutOrganizationInputSchema),z.lazy(() => MembershipUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => MembershipCreateWithoutOrganizationInputSchema),z.lazy(() => MembershipUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const MembershipUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MembershipWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MembershipUpdateWithoutOrganizationInputSchema),z.lazy(() => MembershipUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const MembershipUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MembershipScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MembershipUpdateManyMutationInputSchema),z.lazy(() => MembershipUncheckedUpdateManyWithoutMembersInputSchema) ]),
}).strict();

export const AssessmentUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AssessmentUpdateWithoutOrganizationInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutOrganizationInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const AssessmentUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AssessmentUpdateWithoutOrganizationInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const AssessmentUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => AssessmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AssessmentUpdateManyMutationInputSchema),z.lazy(() => AssessmentUncheckedUpdateManyWithoutAssessmentsInputSchema) ]),
}).strict();

export const CandidateUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CandidateUpdateWithoutOrganizationInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => CandidateCreateWithoutOrganizationInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const CandidateUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CandidateUpdateWithoutOrganizationInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const CandidateUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => CandidateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CandidateUpdateManyMutationInputSchema),z.lazy(() => CandidateUncheckedUpdateManyWithoutCandidatesInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutActiveOrgInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutActiveOrgInputSchema),z.lazy(() => UserUncheckedUpdateWithoutActiveOrgInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutActiveOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutActiveOrgInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutActiveOrgInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutActiveOrgInputSchema),z.lazy(() => UserUncheckedUpdateWithoutActiveOrgInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutActiveOrgInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  completedOnboarding: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumUserTypeNullableFilterSchema),z.lazy(() => UserTypeSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const OrganizationCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutMembersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutOrganizationInputSchema).optional(),
  candidates: z.lazy(() => CandidateCreateNestedManyWithoutOrganizationInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedManyWithoutActiveOrgInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutMembersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutActiveOrgInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const UserCreateWithoutMembershipsInputSchema: z.ZodType<Prisma.UserCreateWithoutMembershipsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentCreateNestedManyWithoutCreatedByInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutUserInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMembershipsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  activeOrgId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMembershipsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMembershipsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembershipsInputSchema) ]),
}).strict();

export const OrganizationUpsertWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateManyWithoutActiveOrgNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutActiveOrgNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUpsertWithoutMembershipsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMembershipsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembershipsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMembershipsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMembershipsInputSchema) ]),
}).strict();

export const UserUpdateWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUpdateWithoutMembershipsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneWithoutUserNestedInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMembershipsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutCandidateInputSchema: z.ZodType<Prisma.UserCreateWithoutCandidateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipCreateNestedManyWithoutUserInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCandidateInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCandidateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  activeOrgId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCandidateInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCandidateInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCandidateInputSchema),z.lazy(() => UserUncheckedCreateWithoutCandidateInputSchema) ]),
}).strict();

export const AssessmentSessionCreateWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionCreateWithoutCandidateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  assessment: z.lazy(() => AssessmentCreateNestedOneWithoutApplicantSessionsInputSchema),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const AssessmentSessionUncheckedCreateWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedCreateWithoutCandidateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  assessmentId: z.string(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const AssessmentSessionCreateOrConnectWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionCreateOrConnectWithoutCandidateInput> = z.object({
  where: z.lazy(() => AssessmentSessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema) ]),
}).strict();

export const AssessmentSessionCreateManyCandidateInputEnvelopeSchema: z.ZodType<Prisma.AssessmentSessionCreateManyCandidateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AssessmentSessionCreateManyCandidateInputSchema),z.lazy(() => AssessmentSessionCreateManyCandidateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrganizationCreateWithoutCandidatesInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutCandidatesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => MembershipCreateNestedManyWithoutOrganizationInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutOrganizationInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedManyWithoutActiveOrgInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutCandidatesInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutCandidatesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutActiveOrgInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutCandidatesInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutCandidatesInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutCandidatesInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutCandidatesInputSchema) ]),
}).strict();

export const AssessmentCreateWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentCreateWithoutCandidatesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedAssessmentsInputSchema),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutAssessmentsInputSchema),
  applicantSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutAssessmentInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentUncheckedCreateWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentUncheckedCreateWithoutCandidatesInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  createdById: z.string(),
  organizationId: z.string(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentCreateOrConnectWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentCreateOrConnectWithoutCandidatesInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema) ]),
}).strict();

export const UserCreateWithoutCreatedCandidatesInputSchema: z.ZodType<Prisma.UserCreateWithoutCreatedCandidatesInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutUserInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCreatedCandidatesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedCandidatesInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  activeOrgId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCreatedCandidatesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedCandidatesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedCandidatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedCandidatesInputSchema) ]),
}).strict();

export const ContributionCreateWithoutContributorInputSchema: z.ZodType<Prisma.ContributionCreateWithoutContributorInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ContributionTypeSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  submission: z.lazy(() => SubmissionCreateNestedOneWithoutContributionsInputSchema).optional()
}).strict();

export const ContributionUncheckedCreateWithoutContributorInputSchema: z.ZodType<Prisma.ContributionUncheckedCreateWithoutContributorInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ContributionTypeSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  submissionId: z.string().optional().nullable()
}).strict();

export const ContributionCreateOrConnectWithoutContributorInputSchema: z.ZodType<Prisma.ContributionCreateOrConnectWithoutContributorInput> = z.object({
  where: z.lazy(() => ContributionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContributionCreateWithoutContributorInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema) ]),
}).strict();

export const ContributionCreateManyContributorInputEnvelopeSchema: z.ZodType<Prisma.ContributionCreateManyContributorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ContributionCreateManyContributorInputSchema),z.lazy(() => ContributionCreateManyContributorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SubmissionCreateWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionCreateWithoutCandidateInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutSubmissionInputSchema).optional(),
  session: z.lazy(() => AssessmentSessionCreateNestedOneWithoutSubmissionInputSchema),
  assessment: z.lazy(() => AssessmentCreateNestedOneWithoutSubmissionInputSchema)
}).strict();

export const SubmissionUncheckedCreateWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionUncheckedCreateWithoutCandidateInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assessmentSessionId: z.string(),
  assessmentId: z.string(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutSubmissionInputSchema).optional()
}).strict();

export const SubmissionCreateOrConnectWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionCreateOrConnectWithoutCandidateInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubmissionCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema) ]),
}).strict();

export const SubmissionCreateManyCandidateInputEnvelopeSchema: z.ZodType<Prisma.SubmissionCreateManyCandidateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubmissionCreateManyCandidateInputSchema),z.lazy(() => SubmissionCreateManyCandidateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutCandidateInputSchema: z.ZodType<Prisma.UserUpsertWithoutCandidateInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCandidateInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCandidateInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCandidateInputSchema),z.lazy(() => UserUncheckedCreateWithoutCandidateInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCandidateInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCandidateInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCandidateInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCandidateInputSchema) ]),
}).strict();

export const UserUpdateWithoutCandidateInputSchema: z.ZodType<Prisma.UserUpdateWithoutCandidateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCandidateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCandidateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const AssessmentSessionUpsertWithWhereUniqueWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionUpsertWithWhereUniqueWithoutCandidateInput> = z.object({
  where: z.lazy(() => AssessmentSessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AssessmentSessionUpdateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUncheckedUpdateWithoutCandidateInputSchema) ]),
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutCandidateInputSchema) ]),
}).strict();

export const AssessmentSessionUpdateWithWhereUniqueWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateWithWhereUniqueWithoutCandidateInput> = z.object({
  where: z.lazy(() => AssessmentSessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AssessmentSessionUpdateWithoutCandidateInputSchema),z.lazy(() => AssessmentSessionUncheckedUpdateWithoutCandidateInputSchema) ]),
}).strict();

export const AssessmentSessionUpdateManyWithWhereWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateManyWithWhereWithoutCandidateInput> = z.object({
  where: z.lazy(() => AssessmentSessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AssessmentSessionUpdateManyMutationInputSchema),z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutAssessmentSessionsInputSchema) ]),
}).strict();

export const AssessmentSessionScalarWhereInputSchema: z.ZodType<Prisma.AssessmentSessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AssessmentSessionScalarWhereInputSchema),z.lazy(() => AssessmentSessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssessmentSessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssessmentSessionScalarWhereInputSchema),z.lazy(() => AssessmentSessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumAssessmentSessionStatusFilterSchema),z.lazy(() => AssessmentSessionStatusSchema) ]).optional(),
  assessmentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  startedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  finishedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  candidateId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const OrganizationUpsertWithoutCandidatesInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutCandidatesInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutCandidatesInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutCandidatesInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutCandidatesInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutCandidatesInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutCandidatesInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutCandidatesInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutCandidatesInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutCandidatesInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutCandidatesInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutCandidatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembershipUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateManyWithoutActiveOrgNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutCandidatesInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutCandidatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembershipUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutActiveOrgNestedInputSchema).optional()
}).strict();

export const AssessmentUpsertWithWhereUniqueWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentUpsertWithWhereUniqueWithoutCandidatesInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AssessmentUpdateWithoutCandidatesInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutCandidatesInputSchema) ]),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutCandidatesInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutCandidatesInputSchema) ]),
}).strict();

export const AssessmentUpdateWithWhereUniqueWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentUpdateWithWhereUniqueWithoutCandidatesInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AssessmentUpdateWithoutCandidatesInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutCandidatesInputSchema) ]),
}).strict();

export const AssessmentUpdateManyWithWhereWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentUpdateManyWithWhereWithoutCandidatesInput> = z.object({
  where: z.lazy(() => AssessmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AssessmentUpdateManyMutationInputSchema),z.lazy(() => AssessmentUncheckedUpdateManyWithoutAssessmentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutCreatedCandidatesInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedCandidatesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedCandidatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedCandidatesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedCandidatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedCandidatesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCreatedCandidatesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedCandidatesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedCandidatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedCandidatesInputSchema) ]),
}).strict();

export const UserUpdateWithoutCreatedCandidatesInputSchema: z.ZodType<Prisma.UserUpdateWithoutCreatedCandidatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneWithoutUserNestedInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCreatedCandidatesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCreatedCandidatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const ContributionUpsertWithWhereUniqueWithoutContributorInputSchema: z.ZodType<Prisma.ContributionUpsertWithWhereUniqueWithoutContributorInput> = z.object({
  where: z.lazy(() => ContributionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContributionUpdateWithoutContributorInputSchema),z.lazy(() => ContributionUncheckedUpdateWithoutContributorInputSchema) ]),
  create: z.union([ z.lazy(() => ContributionCreateWithoutContributorInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutContributorInputSchema) ]),
}).strict();

export const ContributionUpdateWithWhereUniqueWithoutContributorInputSchema: z.ZodType<Prisma.ContributionUpdateWithWhereUniqueWithoutContributorInput> = z.object({
  where: z.lazy(() => ContributionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContributionUpdateWithoutContributorInputSchema),z.lazy(() => ContributionUncheckedUpdateWithoutContributorInputSchema) ]),
}).strict();

export const ContributionUpdateManyWithWhereWithoutContributorInputSchema: z.ZodType<Prisma.ContributionUpdateManyWithWhereWithoutContributorInput> = z.object({
  where: z.lazy(() => ContributionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContributionUpdateManyMutationInputSchema),z.lazy(() => ContributionUncheckedUpdateManyWithoutContributionsInputSchema) ]),
}).strict();

export const ContributionScalarWhereInputSchema: z.ZodType<Prisma.ContributionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContributionScalarWhereInputSchema),z.lazy(() => ContributionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContributionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContributionScalarWhereInputSchema),z.lazy(() => ContributionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumContributionTypeFilterSchema),z.lazy(() => ContributionTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meta: z.lazy(() => JsonFilterSchema).optional(),
  submissionId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  contributorId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const SubmissionUpsertWithWhereUniqueWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionUpsertWithWhereUniqueWithoutCandidateInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubmissionUpdateWithoutCandidateInputSchema),z.lazy(() => SubmissionUncheckedUpdateWithoutCandidateInputSchema) ]),
  create: z.union([ z.lazy(() => SubmissionCreateWithoutCandidateInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutCandidateInputSchema) ]),
}).strict();

export const SubmissionUpdateWithWhereUniqueWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionUpdateWithWhereUniqueWithoutCandidateInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubmissionUpdateWithoutCandidateInputSchema),z.lazy(() => SubmissionUncheckedUpdateWithoutCandidateInputSchema) ]),
}).strict();

export const SubmissionUpdateManyWithWhereWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionUpdateManyWithWhereWithoutCandidateInput> = z.object({
  where: z.lazy(() => SubmissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubmissionUpdateManyMutationInputSchema),z.lazy(() => SubmissionUncheckedUpdateManyWithoutSubmissionInputSchema) ]),
}).strict();

export const SubmissionScalarWhereInputSchema: z.ZodType<Prisma.SubmissionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubmissionScalarWhereInputSchema),z.lazy(() => SubmissionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubmissionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubmissionScalarWhereInputSchema),z.lazy(() => SubmissionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubmissionStateFilterSchema),z.lazy(() => SubmissionStateSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  candidateId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assessmentSessionId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assessmentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutCreatedAssessmentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCreatedAssessmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  memberships: z.lazy(() => MembershipCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutUserInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCreatedAssessmentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedAssessmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable(),
  activeOrgId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCreatedAssessmentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedAssessmentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAssessmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAssessmentsInputSchema) ]),
}).strict();

export const OrganizationCreateWithoutAssessmentsInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutAssessmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => MembershipCreateNestedManyWithoutOrganizationInputSchema).optional(),
  candidates: z.lazy(() => CandidateCreateNestedManyWithoutOrganizationInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedManyWithoutActiveOrgInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutAssessmentsInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutAssessmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => MembershipUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutActiveOrgInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutAssessmentsInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutAssessmentsInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutAssessmentsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutAssessmentsInputSchema) ]),
}).strict();

export const CandidateCreateWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateCreateWithoutAssessmentsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCandidateInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutCandidateInputSchema).optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutCandidatesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateUncheckedCreateWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateWithoutAssessmentsInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string().optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateCreateOrConnectWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateCreateOrConnectWithoutAssessmentsInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema) ]),
}).strict();

export const AssessmentSessionCreateWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionCreateWithoutAssessmentInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutAssessmentSessionsInputSchema),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedCreateWithoutAssessmentInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  candidateId: z.string(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const AssessmentSessionCreateOrConnectWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionCreateOrConnectWithoutAssessmentInput> = z.object({
  where: z.lazy(() => AssessmentSessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema) ]),
}).strict();

export const AssessmentSessionCreateManyAssessmentInputEnvelopeSchema: z.ZodType<Prisma.AssessmentSessionCreateManyAssessmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AssessmentSessionCreateManyAssessmentInputSchema),z.lazy(() => AssessmentSessionCreateManyAssessmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SubmissionCreateWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionCreateWithoutAssessmentInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutSubmissionInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutSubmissionInputSchema),
  session: z.lazy(() => AssessmentSessionCreateNestedOneWithoutSubmissionInputSchema)
}).strict();

export const SubmissionUncheckedCreateWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionUncheckedCreateWithoutAssessmentInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  candidateId: z.string(),
  assessmentSessionId: z.string(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutSubmissionInputSchema).optional()
}).strict();

export const SubmissionCreateOrConnectWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionCreateOrConnectWithoutAssessmentInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema) ]),
}).strict();

export const SubmissionCreateManyAssessmentInputEnvelopeSchema: z.ZodType<Prisma.SubmissionCreateManyAssessmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubmissionCreateManyAssessmentInputSchema),z.lazy(() => SubmissionCreateManyAssessmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutCreatedAssessmentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedAssessmentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedAssessmentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedAssessmentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAssessmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAssessmentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCreatedAssessmentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedAssessmentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedAssessmentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedAssessmentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCreatedAssessmentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCreatedAssessmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneWithoutUserNestedInputSchema).optional(),
  activeOrg: z.lazy(() => OrganizationUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCreatedAssessmentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCreatedAssessmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrgId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const OrganizationUpsertWithoutAssessmentsInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutAssessmentsInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutAssessmentsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutAssessmentsInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutAssessmentsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutAssessmentsInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutAssessmentsInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutAssessmentsInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutAssessmentsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutAssessmentsInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutAssessmentsInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutAssessmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembershipUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateManyWithoutActiveOrgNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutAssessmentsInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutAssessmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembershipUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutActiveOrgNestedInputSchema).optional()
}).strict();

export const CandidateUpsertWithWhereUniqueWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateUpsertWithWhereUniqueWithoutAssessmentsInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CandidateUpdateWithoutAssessmentsInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutAssessmentsInputSchema) ]),
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentsInputSchema) ]),
}).strict();

export const CandidateUpdateWithWhereUniqueWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateUpdateWithWhereUniqueWithoutAssessmentsInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CandidateUpdateWithoutAssessmentsInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutAssessmentsInputSchema) ]),
}).strict();

export const CandidateUpdateManyWithWhereWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateUpdateManyWithWhereWithoutAssessmentsInput> = z.object({
  where: z.lazy(() => CandidateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CandidateUpdateManyMutationInputSchema),z.lazy(() => CandidateUncheckedUpdateManyWithoutCandidatesInputSchema) ]),
}).strict();

export const AssessmentSessionUpsertWithWhereUniqueWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionUpsertWithWhereUniqueWithoutAssessmentInput> = z.object({
  where: z.lazy(() => AssessmentSessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AssessmentSessionUpdateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUncheckedUpdateWithoutAssessmentInputSchema) ]),
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutAssessmentInputSchema) ]),
}).strict();

export const AssessmentSessionUpdateWithWhereUniqueWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateWithWhereUniqueWithoutAssessmentInput> = z.object({
  where: z.lazy(() => AssessmentSessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AssessmentSessionUpdateWithoutAssessmentInputSchema),z.lazy(() => AssessmentSessionUncheckedUpdateWithoutAssessmentInputSchema) ]),
}).strict();

export const AssessmentSessionUpdateManyWithWhereWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateManyWithWhereWithoutAssessmentInput> = z.object({
  where: z.lazy(() => AssessmentSessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AssessmentSessionUpdateManyMutationInputSchema),z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutApplicantSessionsInputSchema) ]),
}).strict();

export const SubmissionUpsertWithWhereUniqueWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionUpsertWithWhereUniqueWithoutAssessmentInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubmissionUpdateWithoutAssessmentInputSchema),z.lazy(() => SubmissionUncheckedUpdateWithoutAssessmentInputSchema) ]),
  create: z.union([ z.lazy(() => SubmissionCreateWithoutAssessmentInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutAssessmentInputSchema) ]),
}).strict();

export const SubmissionUpdateWithWhereUniqueWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionUpdateWithWhereUniqueWithoutAssessmentInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubmissionUpdateWithoutAssessmentInputSchema),z.lazy(() => SubmissionUncheckedUpdateWithoutAssessmentInputSchema) ]),
}).strict();

export const SubmissionUpdateManyWithWhereWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionUpdateManyWithWhereWithoutAssessmentInput> = z.object({
  where: z.lazy(() => SubmissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubmissionUpdateManyMutationInputSchema),z.lazy(() => SubmissionUncheckedUpdateManyWithoutSubmissionInputSchema) ]),
}).strict();

export const AssessmentCreateWithoutApplicantSessionsInputSchema: z.ZodType<Prisma.AssessmentCreateWithoutApplicantSessionsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedAssessmentsInputSchema),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutAssessmentsInputSchema),
  candidates: z.lazy(() => CandidateCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentUncheckedCreateWithoutApplicantSessionsInputSchema: z.ZodType<Prisma.AssessmentUncheckedCreateWithoutApplicantSessionsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  createdById: z.string(),
  organizationId: z.string(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentCreateOrConnectWithoutApplicantSessionsInputSchema: z.ZodType<Prisma.AssessmentCreateOrConnectWithoutApplicantSessionsInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutApplicantSessionsInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutApplicantSessionsInputSchema) ]),
}).strict();

export const CandidateCreateWithoutAssessmentSessionsInputSchema: z.ZodType<Prisma.CandidateCreateWithoutAssessmentSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCandidateInputSchema).optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutCandidatesInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutCandidatesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateUncheckedCreateWithoutAssessmentSessionsInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateWithoutAssessmentSessionsInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string().optional().nullable(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutContributorInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateCreateOrConnectWithoutAssessmentSessionsInputSchema: z.ZodType<Prisma.CandidateCreateOrConnectWithoutAssessmentSessionsInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentSessionsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentSessionsInputSchema) ]),
}).strict();

export const SubmissionCreateWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionCreateWithoutSessionInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutSubmissionInputSchema).optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutSubmissionInputSchema),
  assessment: z.lazy(() => AssessmentCreateNestedOneWithoutSubmissionInputSchema)
}).strict();

export const SubmissionUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  candidateId: z.string(),
  assessmentId: z.string(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutSubmissionInputSchema).optional()
}).strict();

export const SubmissionCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubmissionCreateWithoutSessionInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const SubmissionCreateManySessionInputEnvelopeSchema: z.ZodType<Prisma.SubmissionCreateManySessionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SubmissionCreateManySessionInputSchema),z.lazy(() => SubmissionCreateManySessionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AssessmentUpsertWithoutApplicantSessionsInputSchema: z.ZodType<Prisma.AssessmentUpsertWithoutApplicantSessionsInput> = z.object({
  update: z.union([ z.lazy(() => AssessmentUpdateWithoutApplicantSessionsInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutApplicantSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutApplicantSessionsInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutApplicantSessionsInputSchema) ]),
  where: z.lazy(() => AssessmentWhereInputSchema).optional()
}).strict();

export const AssessmentUpdateToOneWithWhereWithoutApplicantSessionsInputSchema: z.ZodType<Prisma.AssessmentUpdateToOneWithWhereWithoutApplicantSessionsInput> = z.object({
  where: z.lazy(() => AssessmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AssessmentUpdateWithoutApplicantSessionsInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutApplicantSessionsInputSchema) ]),
}).strict();

export const AssessmentUpdateWithoutApplicantSessionsInputSchema: z.ZodType<Prisma.AssessmentUpdateWithoutApplicantSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAssessmentsNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutAssessmentsNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const AssessmentUncheckedUpdateWithoutApplicantSessionsInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateWithoutApplicantSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  candidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const CandidateUpsertWithoutAssessmentSessionsInputSchema: z.ZodType<Prisma.CandidateUpsertWithoutAssessmentSessionsInput> = z.object({
  update: z.union([ z.lazy(() => CandidateUpdateWithoutAssessmentSessionsInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutAssessmentSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => CandidateCreateWithoutAssessmentSessionsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutAssessmentSessionsInputSchema) ]),
  where: z.lazy(() => CandidateWhereInputSchema).optional()
}).strict();

export const CandidateUpdateToOneWithWhereWithoutAssessmentSessionsInputSchema: z.ZodType<Prisma.CandidateUpdateToOneWithWhereWithoutAssessmentSessionsInput> = z.object({
  where: z.lazy(() => CandidateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CandidateUpdateWithoutAssessmentSessionsInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutAssessmentSessionsInputSchema) ]),
}).strict();

export const CandidateUpdateWithoutAssessmentSessionsInputSchema: z.ZodType<Prisma.CandidateUpdateWithoutAssessmentSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCandidateNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneWithoutCandidatesNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateWithoutAssessmentSessionsInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateWithoutAssessmentSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const SubmissionUpsertWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionUpsertWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SubmissionUpdateWithoutSessionInputSchema),z.lazy(() => SubmissionUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => SubmissionCreateWithoutSessionInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const SubmissionUpdateWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionUpdateWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SubmissionUpdateWithoutSessionInputSchema),z.lazy(() => SubmissionUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const SubmissionUpdateManyWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionUpdateManyWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => SubmissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SubmissionUpdateManyMutationInputSchema),z.lazy(() => SubmissionUncheckedUpdateManyWithoutSubmissionInputSchema) ]),
}).strict();

export const ContributionCreateWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionCreateWithoutSubmissionInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ContributionTypeSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  contributor: z.lazy(() => CandidateCreateNestedOneWithoutContributionsInputSchema)
}).strict();

export const ContributionUncheckedCreateWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionUncheckedCreateWithoutSubmissionInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ContributionTypeSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  contributorId: z.string()
}).strict();

export const ContributionCreateOrConnectWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionCreateOrConnectWithoutSubmissionInput> = z.object({
  where: z.lazy(() => ContributionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContributionCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema) ]),
}).strict();

export const ContributionCreateManySubmissionInputEnvelopeSchema: z.ZodType<Prisma.ContributionCreateManySubmissionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ContributionCreateManySubmissionInputSchema),z.lazy(() => ContributionCreateManySubmissionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CandidateCreateWithoutSubmissionInputSchema: z.ZodType<Prisma.CandidateCreateWithoutSubmissionInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCandidateInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutCandidateInputSchema).optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutCandidatesInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutCandidatesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionCreateNestedManyWithoutContributorInputSchema).optional()
}).strict();

export const CandidateUncheckedCreateWithoutSubmissionInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateWithoutSubmissionInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string().optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCandidatesInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedCreateNestedManyWithoutContributorInputSchema).optional()
}).strict();

export const CandidateCreateOrConnectWithoutSubmissionInputSchema: z.ZodType<Prisma.CandidateCreateOrConnectWithoutSubmissionInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CandidateCreateWithoutSubmissionInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutSubmissionInputSchema) ]),
}).strict();

export const AssessmentSessionCreateWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentSessionCreateWithoutSubmissionInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  assessment: z.lazy(() => AssessmentCreateNestedOneWithoutApplicantSessionsInputSchema),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutAssessmentSessionsInputSchema)
}).strict();

export const AssessmentSessionUncheckedCreateWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedCreateWithoutSubmissionInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  assessmentId: z.string(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  candidateId: z.string()
}).strict();

export const AssessmentSessionCreateOrConnectWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentSessionCreateOrConnectWithoutSubmissionInput> = z.object({
  where: z.lazy(() => AssessmentSessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutSubmissionInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutSubmissionInputSchema) ]),
}).strict();

export const AssessmentCreateWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentCreateWithoutSubmissionInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedAssessmentsInputSchema),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutAssessmentsInputSchema),
  candidates: z.lazy(() => CandidateCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentUncheckedCreateWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentUncheckedCreateWithoutSubmissionInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  createdById: z.string(),
  organizationId: z.string(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional(),
  candidates: z.lazy(() => CandidateUncheckedCreateNestedManyWithoutAssessmentsInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutAssessmentInputSchema).optional()
}).strict();

export const AssessmentCreateOrConnectWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentCreateOrConnectWithoutSubmissionInput> = z.object({
  where: z.lazy(() => AssessmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutSubmissionInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutSubmissionInputSchema) ]),
}).strict();

export const ContributionUpsertWithWhereUniqueWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionUpsertWithWhereUniqueWithoutSubmissionInput> = z.object({
  where: z.lazy(() => ContributionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContributionUpdateWithoutSubmissionInputSchema),z.lazy(() => ContributionUncheckedUpdateWithoutSubmissionInputSchema) ]),
  create: z.union([ z.lazy(() => ContributionCreateWithoutSubmissionInputSchema),z.lazy(() => ContributionUncheckedCreateWithoutSubmissionInputSchema) ]),
}).strict();

export const ContributionUpdateWithWhereUniqueWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionUpdateWithWhereUniqueWithoutSubmissionInput> = z.object({
  where: z.lazy(() => ContributionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContributionUpdateWithoutSubmissionInputSchema),z.lazy(() => ContributionUncheckedUpdateWithoutSubmissionInputSchema) ]),
}).strict();

export const ContributionUpdateManyWithWhereWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionUpdateManyWithWhereWithoutSubmissionInput> = z.object({
  where: z.lazy(() => ContributionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContributionUpdateManyMutationInputSchema),z.lazy(() => ContributionUncheckedUpdateManyWithoutContributionsInputSchema) ]),
}).strict();

export const CandidateUpsertWithoutSubmissionInputSchema: z.ZodType<Prisma.CandidateUpsertWithoutSubmissionInput> = z.object({
  update: z.union([ z.lazy(() => CandidateUpdateWithoutSubmissionInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutSubmissionInputSchema) ]),
  create: z.union([ z.lazy(() => CandidateCreateWithoutSubmissionInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutSubmissionInputSchema) ]),
  where: z.lazy(() => CandidateWhereInputSchema).optional()
}).strict();

export const CandidateUpdateToOneWithWhereWithoutSubmissionInputSchema: z.ZodType<Prisma.CandidateUpdateToOneWithWhereWithoutSubmissionInput> = z.object({
  where: z.lazy(() => CandidateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CandidateUpdateWithoutSubmissionInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutSubmissionInputSchema) ]),
}).strict();

export const CandidateUpdateWithoutSubmissionInputSchema: z.ZodType<Prisma.CandidateUpdateWithoutSubmissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCandidateNestedInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutCandidateNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneWithoutCandidatesNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutContributorNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateWithoutSubmissionInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateWithoutSubmissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutContributorNestedInputSchema).optional()
}).strict();

export const AssessmentSessionUpsertWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentSessionUpsertWithoutSubmissionInput> = z.object({
  update: z.union([ z.lazy(() => AssessmentSessionUpdateWithoutSubmissionInputSchema),z.lazy(() => AssessmentSessionUncheckedUpdateWithoutSubmissionInputSchema) ]),
  create: z.union([ z.lazy(() => AssessmentSessionCreateWithoutSubmissionInputSchema),z.lazy(() => AssessmentSessionUncheckedCreateWithoutSubmissionInputSchema) ]),
  where: z.lazy(() => AssessmentSessionWhereInputSchema).optional()
}).strict();

export const AssessmentSessionUpdateToOneWithWhereWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateToOneWithWhereWithoutSubmissionInput> = z.object({
  where: z.lazy(() => AssessmentSessionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AssessmentSessionUpdateWithoutSubmissionInputSchema),z.lazy(() => AssessmentSessionUncheckedUpdateWithoutSubmissionInputSchema) ]),
}).strict();

export const AssessmentSessionUpdateWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateWithoutSubmissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessment: z.lazy(() => AssessmentUpdateOneRequiredWithoutApplicantSessionsNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneRequiredWithoutAssessmentSessionsNestedInputSchema).optional()
}).strict();

export const AssessmentSessionUncheckedUpdateWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedUpdateWithoutSubmissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AssessmentUpsertWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentUpsertWithoutSubmissionInput> = z.object({
  update: z.union([ z.lazy(() => AssessmentUpdateWithoutSubmissionInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutSubmissionInputSchema) ]),
  create: z.union([ z.lazy(() => AssessmentCreateWithoutSubmissionInputSchema),z.lazy(() => AssessmentUncheckedCreateWithoutSubmissionInputSchema) ]),
  where: z.lazy(() => AssessmentWhereInputSchema).optional()
}).strict();

export const AssessmentUpdateToOneWithWhereWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentUpdateToOneWithWhereWithoutSubmissionInput> = z.object({
  where: z.lazy(() => AssessmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AssessmentUpdateWithoutSubmissionInputSchema),z.lazy(() => AssessmentUncheckedUpdateWithoutSubmissionInputSchema) ]),
}).strict();

export const AssessmentUpdateWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentUpdateWithoutSubmissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAssessmentsNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutAssessmentsNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const AssessmentUncheckedUpdateWithoutSubmissionInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateWithoutSubmissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  candidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const SubmissionCreateWithoutContributionsInputSchema: z.ZodType<Prisma.SubmissionCreateWithoutContributionsInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  candidate: z.lazy(() => CandidateCreateNestedOneWithoutSubmissionInputSchema),
  session: z.lazy(() => AssessmentSessionCreateNestedOneWithoutSubmissionInputSchema),
  assessment: z.lazy(() => AssessmentCreateNestedOneWithoutSubmissionInputSchema)
}).strict();

export const SubmissionUncheckedCreateWithoutContributionsInputSchema: z.ZodType<Prisma.SubmissionUncheckedCreateWithoutContributionsInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  candidateId: z.string(),
  assessmentSessionId: z.string(),
  assessmentId: z.string()
}).strict();

export const SubmissionCreateOrConnectWithoutContributionsInputSchema: z.ZodType<Prisma.SubmissionCreateOrConnectWithoutContributionsInput> = z.object({
  where: z.lazy(() => SubmissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubmissionCreateWithoutContributionsInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutContributionsInputSchema) ]),
}).strict();

export const CandidateCreateWithoutContributionsInputSchema: z.ZodType<Prisma.CandidateCreateWithoutContributionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCandidateInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionCreateNestedManyWithoutCandidateInputSchema).optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutCandidatesInputSchema).optional(),
  assessments: z.lazy(() => AssessmentCreateNestedManyWithoutCandidatesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedCandidatesInputSchema).optional(),
  Submission: z.lazy(() => SubmissionCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateUncheckedCreateWithoutContributionsInputSchema: z.ZodType<Prisma.CandidateUncheckedCreateWithoutContributionsInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string().optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedCreateNestedManyWithoutCandidatesInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedCreateNestedManyWithoutCandidateInputSchema).optional()
}).strict();

export const CandidateCreateOrConnectWithoutContributionsInputSchema: z.ZodType<Prisma.CandidateCreateOrConnectWithoutContributionsInput> = z.object({
  where: z.lazy(() => CandidateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CandidateCreateWithoutContributionsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutContributionsInputSchema) ]),
}).strict();

export const SubmissionUpsertWithoutContributionsInputSchema: z.ZodType<Prisma.SubmissionUpsertWithoutContributionsInput> = z.object({
  update: z.union([ z.lazy(() => SubmissionUpdateWithoutContributionsInputSchema),z.lazy(() => SubmissionUncheckedUpdateWithoutContributionsInputSchema) ]),
  create: z.union([ z.lazy(() => SubmissionCreateWithoutContributionsInputSchema),z.lazy(() => SubmissionUncheckedCreateWithoutContributionsInputSchema) ]),
  where: z.lazy(() => SubmissionWhereInputSchema).optional()
}).strict();

export const SubmissionUpdateToOneWithWhereWithoutContributionsInputSchema: z.ZodType<Prisma.SubmissionUpdateToOneWithWhereWithoutContributionsInput> = z.object({
  where: z.lazy(() => SubmissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SubmissionUpdateWithoutContributionsInputSchema),z.lazy(() => SubmissionUncheckedUpdateWithoutContributionsInputSchema) ]),
}).strict();

export const SubmissionUpdateWithoutContributionsInputSchema: z.ZodType<Prisma.SubmissionUpdateWithoutContributionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  candidate: z.lazy(() => CandidateUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional(),
  session: z.lazy(() => AssessmentSessionUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional(),
  assessment: z.lazy(() => AssessmentUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional()
}).strict();

export const SubmissionUncheckedUpdateWithoutContributionsInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateWithoutContributionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentSessionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CandidateUpsertWithoutContributionsInputSchema: z.ZodType<Prisma.CandidateUpsertWithoutContributionsInput> = z.object({
  update: z.union([ z.lazy(() => CandidateUpdateWithoutContributionsInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutContributionsInputSchema) ]),
  create: z.union([ z.lazy(() => CandidateCreateWithoutContributionsInputSchema),z.lazy(() => CandidateUncheckedCreateWithoutContributionsInputSchema) ]),
  where: z.lazy(() => CandidateWhereInputSchema).optional()
}).strict();

export const CandidateUpdateToOneWithWhereWithoutContributionsInputSchema: z.ZodType<Prisma.CandidateUpdateToOneWithWhereWithoutContributionsInput> = z.object({
  where: z.lazy(() => CandidateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CandidateUpdateWithoutContributionsInputSchema),z.lazy(() => CandidateUncheckedUpdateWithoutContributionsInputSchema) ]),
}).strict();

export const CandidateUpdateWithoutContributionsInputSchema: z.ZodType<Prisma.CandidateUpdateWithoutContributionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCandidateNestedInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutCandidateNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneWithoutCandidatesNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedCandidatesNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateWithoutContributionsInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateWithoutContributionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const AssessmentCreateManyCreatedByInputSchema: z.ZodType<Prisma.AssessmentCreateManyCreatedByInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  organizationId: z.string(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional()
}).strict();

export const MembershipCreateManyUserInputSchema: z.ZodType<Prisma.MembershipCreateManyUserInput> = z.object({
  accepted: z.boolean().optional(),
  role: z.lazy(() => MembershipRoleSchema),
  organizationId: z.string()
}).strict();

export const CandidateCreateManyCreatedByInputSchema: z.ZodType<Prisma.CandidateCreateManyCreatedByInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AssessmentUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutAssessmentsNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutAssessmentNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const AssessmentUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  candidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const AssessmentUncheckedUpdateManyWithoutCreatedAssessmentsInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateManyWithoutCreatedAssessmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MembershipUpdateWithoutUserInputSchema: z.ZodType<Prisma.MembershipUpdateWithoutUserInput> = z.object({
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const MembershipUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MembershipUncheckedUpdateWithoutUserInput> = z.object({
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MembershipUncheckedUpdateManyWithoutMembershipsInputSchema: z.ZodType<Prisma.MembershipUncheckedUpdateManyWithoutMembershipsInput> = z.object({
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CandidateUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCandidateNestedInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutCandidateNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneWithoutCandidatesNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateManyWithoutCreatedCandidatesInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateManyWithoutCreatedCandidatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MembershipCreateManyOrganizationInputSchema: z.ZodType<Prisma.MembershipCreateManyOrganizationInput> = z.object({
  userId: z.string(),
  accepted: z.boolean().optional(),
  role: z.lazy(() => MembershipRoleSchema)
}).strict();

export const AssessmentCreateManyOrganizationInputSchema: z.ZodType<Prisma.AssessmentCreateManyOrganizationInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string(),
  status: z.lazy(() => AssessmentStatusSchema).optional(),
  createdById: z.string(),
  ghIssuesQuerySeach: z.string().optional().nullable(),
  evaluationPeriod: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
  visibility: z.lazy(() => VisibilitySchema).optional()
}).strict();

export const CandidateCreateManyOrganizationInputSchema: z.ZodType<Prisma.CandidateCreateManyOrganizationInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  name: z.string(),
  ghUsername: z.string().optional().nullable(),
  status: z.lazy(() => CandidateStatusSchema).optional(),
  lastName: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string().optional().nullable()
}).strict();

export const UserCreateManyActiveOrgInputSchema: z.ZodType<Prisma.UserCreateManyActiveOrgInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  image: z.string().optional().nullable(),
  type: z.lazy(() => UserTypeSchema).optional().nullable()
}).strict();

export const MembershipUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipUpdateWithoutOrganizationInput> = z.object({
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMembershipsNestedInputSchema).optional()
}).strict();

export const MembershipUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.MembershipUncheckedUpdateWithoutOrganizationInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MembershipUncheckedUpdateManyWithoutMembersInputSchema: z.ZodType<Prisma.MembershipUncheckedUpdateManyWithoutMembersInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accepted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AssessmentUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAssessmentsNestedInputSchema).optional(),
  candidates: z.lazy(() => CandidateUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutAssessmentNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const AssessmentUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  candidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutAssessmentsNestedInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const AssessmentUncheckedUpdateManyWithoutAssessmentsInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateManyWithoutAssessmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CandidateUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCandidateNestedInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutCandidateNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateWithoutOrganizationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional(),
  assessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateManyWithoutCandidatesInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateManyWithoutCandidatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUpdateWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserUpdateWithoutActiveOrgInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutActiveOrgInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutActiveOrgInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdAssessments: z.lazy(() => AssessmentUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  memberships: z.lazy(() => MembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  createdCandidates: z.lazy(() => CandidateUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completedOnboarding: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NullableEnumUserTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AssessmentSessionCreateManyCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionCreateManyCandidateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  assessmentId: z.string(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable()
}).strict();

export const ContributionCreateManyContributorInputSchema: z.ZodType<Prisma.ContributionCreateManyContributorInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ContributionTypeSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  submissionId: z.string().optional().nullable()
}).strict();

export const SubmissionCreateManyCandidateInputSchema: z.ZodType<Prisma.SubmissionCreateManyCandidateInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assessmentSessionId: z.string(),
  assessmentId: z.string()
}).strict();

export const AssessmentSessionUpdateWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateWithoutCandidateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessment: z.lazy(() => AssessmentUpdateOneRequiredWithoutApplicantSessionsNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const AssessmentSessionUncheckedUpdateWithoutCandidateInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedUpdateWithoutCandidateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const AssessmentSessionUncheckedUpdateManyWithoutAssessmentSessionsInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedUpdateManyWithoutAssessmentSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AssessmentUpdateWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentUpdateWithoutCandidatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAssessmentsNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutAssessmentsNestedInputSchema).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutAssessmentNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const AssessmentUncheckedUpdateWithoutCandidatesInputSchema: z.ZodType<Prisma.AssessmentUncheckedUpdateWithoutCandidatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentStatusSchema),z.lazy(() => EnumAssessmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghIssuesQuerySeach: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evaluationPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  visibility: z.union([ z.lazy(() => VisibilitySchema),z.lazy(() => EnumVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  applicantSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutAssessmentNestedInputSchema).optional()
}).strict();

export const ContributionUpdateWithoutContributorInputSchema: z.ZodType<Prisma.ContributionUpdateWithoutContributorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => EnumContributionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  submission: z.lazy(() => SubmissionUpdateOneWithoutContributionsNestedInputSchema).optional()
}).strict();

export const ContributionUncheckedUpdateWithoutContributorInputSchema: z.ZodType<Prisma.ContributionUncheckedUpdateWithoutContributorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => EnumContributionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  submissionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ContributionUncheckedUpdateManyWithoutContributionsInputSchema: z.ZodType<Prisma.ContributionUncheckedUpdateManyWithoutContributionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => EnumContributionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  submissionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SubmissionUpdateWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionUpdateWithoutCandidateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutSubmissionNestedInputSchema).optional(),
  session: z.lazy(() => AssessmentSessionUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional(),
  assessment: z.lazy(() => AssessmentUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional()
}).strict();

export const SubmissionUncheckedUpdateWithoutCandidateInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateWithoutCandidateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentSessionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutSubmissionNestedInputSchema).optional()
}).strict();

export const SubmissionUncheckedUpdateManyWithoutSubmissionInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateManyWithoutSubmissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentSessionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AssessmentSessionCreateManyAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionCreateManyAssessmentInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expiresAt: z.coerce.date(),
  status: z.lazy(() => AssessmentSessionStatusSchema).optional(),
  startedAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date().optional().nullable(),
  candidateId: z.string()
}).strict();

export const SubmissionCreateManyAssessmentInputSchema: z.ZodType<Prisma.SubmissionCreateManyAssessmentInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  candidateId: z.string(),
  assessmentSessionId: z.string()
}).strict();

export const CandidateUpdateWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateUpdateWithoutAssessmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCandidateNestedInputSchema).optional(),
  assessmentSessions: z.lazy(() => AssessmentSessionUpdateManyWithoutCandidateNestedInputSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneWithoutCandidatesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutCreatedCandidatesNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const CandidateUncheckedUpdateWithoutAssessmentsInputSchema: z.ZodType<Prisma.CandidateUncheckedUpdateWithoutAssessmentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ghUsername: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => CandidateStatusSchema),z.lazy(() => EnumCandidateStatusFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  assessmentSessions: z.lazy(() => AssessmentSessionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutContributorNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutCandidateNestedInputSchema).optional()
}).strict();

export const AssessmentSessionUpdateWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionUpdateWithoutAssessmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candidate: z.lazy(() => CandidateUpdateOneRequiredWithoutAssessmentSessionsNestedInputSchema).optional(),
  Submission: z.lazy(() => SubmissionUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const AssessmentSessionUncheckedUpdateWithoutAssessmentInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedUpdateWithoutAssessmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Submission: z.lazy(() => SubmissionUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const AssessmentSessionUncheckedUpdateManyWithoutApplicantSessionsInputSchema: z.ZodType<Prisma.AssessmentSessionUncheckedUpdateManyWithoutApplicantSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AssessmentSessionStatusSchema),z.lazy(() => EnumAssessmentSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  finishedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubmissionUpdateWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionUpdateWithoutAssessmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutSubmissionNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional(),
  session: z.lazy(() => AssessmentSessionUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional()
}).strict();

export const SubmissionUncheckedUpdateWithoutAssessmentInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateWithoutAssessmentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentSessionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutSubmissionNestedInputSchema).optional()
}).strict();

export const SubmissionCreateManySessionInputSchema: z.ZodType<Prisma.SubmissionCreateManySessionInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => SubmissionStateSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  candidateId: z.string(),
  assessmentId: z.string()
}).strict();

export const SubmissionUpdateWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  contributions: z.lazy(() => ContributionUpdateManyWithoutSubmissionNestedInputSchema).optional(),
  candidate: z.lazy(() => CandidateUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional(),
  assessment: z.lazy(() => AssessmentUpdateOneRequiredWithoutSubmissionNestedInputSchema).optional()
}).strict();

export const SubmissionUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.SubmissionUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubmissionStateSchema),z.lazy(() => EnumSubmissionStateFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  candidateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assessmentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contributions: z.lazy(() => ContributionUncheckedUpdateManyWithoutSubmissionNestedInputSchema).optional()
}).strict();

export const ContributionCreateManySubmissionInputSchema: z.ZodType<Prisma.ContributionCreateManySubmissionInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => ContributionTypeSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  contributorId: z.string()
}).strict();

export const ContributionUpdateWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionUpdateWithoutSubmissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => EnumContributionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  contributor: z.lazy(() => CandidateUpdateOneRequiredWithoutContributionsNestedInputSchema).optional()
}).strict();

export const ContributionUncheckedUpdateWithoutSubmissionInputSchema: z.ZodType<Prisma.ContributionUncheckedUpdateWithoutSubmissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContributionTypeSchema),z.lazy(() => EnumContributionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meta: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  contributorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const OrganizationFindFirstArgsSchema: z.ZodType<Prisma.OrganizationFindFirstArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrganizationScalarFieldEnumSchema,OrganizationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const OrganizationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OrganizationFindFirstOrThrowArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrganizationScalarFieldEnumSchema,OrganizationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const OrganizationFindManyArgsSchema: z.ZodType<Prisma.OrganizationFindManyArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrganizationScalarFieldEnumSchema,OrganizationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const OrganizationAggregateArgsSchema: z.ZodType<Prisma.OrganizationAggregateArgs> = z.object({
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const OrganizationGroupByArgsSchema: z.ZodType<Prisma.OrganizationGroupByArgs> = z.object({
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithAggregationInputSchema.array(),OrganizationOrderByWithAggregationInputSchema ]).optional(),
  by: OrganizationScalarFieldEnumSchema.array(),
  having: OrganizationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const OrganizationFindUniqueArgsSchema: z.ZodType<Prisma.OrganizationFindUniqueArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict()

export const OrganizationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OrganizationFindUniqueOrThrowArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict()

export const MembershipFindFirstArgsSchema: z.ZodType<Prisma.MembershipFindFirstArgs> = z.object({
  select: MembershipSelectSchema.optional(),
  include: MembershipIncludeSchema.optional(),
  where: MembershipWhereInputSchema.optional(),
  orderBy: z.union([ MembershipOrderByWithRelationInputSchema.array(),MembershipOrderByWithRelationInputSchema ]).optional(),
  cursor: MembershipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MembershipScalarFieldEnumSchema,MembershipScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MembershipFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MembershipFindFirstOrThrowArgs> = z.object({
  select: MembershipSelectSchema.optional(),
  include: MembershipIncludeSchema.optional(),
  where: MembershipWhereInputSchema.optional(),
  orderBy: z.union([ MembershipOrderByWithRelationInputSchema.array(),MembershipOrderByWithRelationInputSchema ]).optional(),
  cursor: MembershipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MembershipScalarFieldEnumSchema,MembershipScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MembershipFindManyArgsSchema: z.ZodType<Prisma.MembershipFindManyArgs> = z.object({
  select: MembershipSelectSchema.optional(),
  include: MembershipIncludeSchema.optional(),
  where: MembershipWhereInputSchema.optional(),
  orderBy: z.union([ MembershipOrderByWithRelationInputSchema.array(),MembershipOrderByWithRelationInputSchema ]).optional(),
  cursor: MembershipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MembershipScalarFieldEnumSchema,MembershipScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MembershipAggregateArgsSchema: z.ZodType<Prisma.MembershipAggregateArgs> = z.object({
  where: MembershipWhereInputSchema.optional(),
  orderBy: z.union([ MembershipOrderByWithRelationInputSchema.array(),MembershipOrderByWithRelationInputSchema ]).optional(),
  cursor: MembershipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MembershipGroupByArgsSchema: z.ZodType<Prisma.MembershipGroupByArgs> = z.object({
  where: MembershipWhereInputSchema.optional(),
  orderBy: z.union([ MembershipOrderByWithAggregationInputSchema.array(),MembershipOrderByWithAggregationInputSchema ]).optional(),
  by: MembershipScalarFieldEnumSchema.array(),
  having: MembershipScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MembershipFindUniqueArgsSchema: z.ZodType<Prisma.MembershipFindUniqueArgs> = z.object({
  select: MembershipSelectSchema.optional(),
  include: MembershipIncludeSchema.optional(),
  where: MembershipWhereUniqueInputSchema,
}).strict()

export const MembershipFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MembershipFindUniqueOrThrowArgs> = z.object({
  select: MembershipSelectSchema.optional(),
  include: MembershipIncludeSchema.optional(),
  where: MembershipWhereUniqueInputSchema,
}).strict()

export const CandidateFindFirstArgsSchema: z.ZodType<Prisma.CandidateFindFirstArgs> = z.object({
  select: CandidateSelectSchema.optional(),
  include: CandidateIncludeSchema.optional(),
  where: CandidateWhereInputSchema.optional(),
  orderBy: z.union([ CandidateOrderByWithRelationInputSchema.array(),CandidateOrderByWithRelationInputSchema ]).optional(),
  cursor: CandidateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CandidateScalarFieldEnumSchema,CandidateScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CandidateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CandidateFindFirstOrThrowArgs> = z.object({
  select: CandidateSelectSchema.optional(),
  include: CandidateIncludeSchema.optional(),
  where: CandidateWhereInputSchema.optional(),
  orderBy: z.union([ CandidateOrderByWithRelationInputSchema.array(),CandidateOrderByWithRelationInputSchema ]).optional(),
  cursor: CandidateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CandidateScalarFieldEnumSchema,CandidateScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CandidateFindManyArgsSchema: z.ZodType<Prisma.CandidateFindManyArgs> = z.object({
  select: CandidateSelectSchema.optional(),
  include: CandidateIncludeSchema.optional(),
  where: CandidateWhereInputSchema.optional(),
  orderBy: z.union([ CandidateOrderByWithRelationInputSchema.array(),CandidateOrderByWithRelationInputSchema ]).optional(),
  cursor: CandidateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CandidateScalarFieldEnumSchema,CandidateScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CandidateAggregateArgsSchema: z.ZodType<Prisma.CandidateAggregateArgs> = z.object({
  where: CandidateWhereInputSchema.optional(),
  orderBy: z.union([ CandidateOrderByWithRelationInputSchema.array(),CandidateOrderByWithRelationInputSchema ]).optional(),
  cursor: CandidateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CandidateGroupByArgsSchema: z.ZodType<Prisma.CandidateGroupByArgs> = z.object({
  where: CandidateWhereInputSchema.optional(),
  orderBy: z.union([ CandidateOrderByWithAggregationInputSchema.array(),CandidateOrderByWithAggregationInputSchema ]).optional(),
  by: CandidateScalarFieldEnumSchema.array(),
  having: CandidateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CandidateFindUniqueArgsSchema: z.ZodType<Prisma.CandidateFindUniqueArgs> = z.object({
  select: CandidateSelectSchema.optional(),
  include: CandidateIncludeSchema.optional(),
  where: CandidateWhereUniqueInputSchema,
}).strict()

export const CandidateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CandidateFindUniqueOrThrowArgs> = z.object({
  select: CandidateSelectSchema.optional(),
  include: CandidateIncludeSchema.optional(),
  where: CandidateWhereUniqueInputSchema,
}).strict()

export const AssessmentFindFirstArgsSchema: z.ZodType<Prisma.AssessmentFindFirstArgs> = z.object({
  select: AssessmentSelectSchema.optional(),
  include: AssessmentIncludeSchema.optional(),
  where: AssessmentWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentOrderByWithRelationInputSchema.array(),AssessmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AssessmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AssessmentScalarFieldEnumSchema,AssessmentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AssessmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AssessmentFindFirstOrThrowArgs> = z.object({
  select: AssessmentSelectSchema.optional(),
  include: AssessmentIncludeSchema.optional(),
  where: AssessmentWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentOrderByWithRelationInputSchema.array(),AssessmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AssessmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AssessmentScalarFieldEnumSchema,AssessmentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AssessmentFindManyArgsSchema: z.ZodType<Prisma.AssessmentFindManyArgs> = z.object({
  select: AssessmentSelectSchema.optional(),
  include: AssessmentIncludeSchema.optional(),
  where: AssessmentWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentOrderByWithRelationInputSchema.array(),AssessmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AssessmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AssessmentScalarFieldEnumSchema,AssessmentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AssessmentAggregateArgsSchema: z.ZodType<Prisma.AssessmentAggregateArgs> = z.object({
  where: AssessmentWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentOrderByWithRelationInputSchema.array(),AssessmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AssessmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AssessmentGroupByArgsSchema: z.ZodType<Prisma.AssessmentGroupByArgs> = z.object({
  where: AssessmentWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentOrderByWithAggregationInputSchema.array(),AssessmentOrderByWithAggregationInputSchema ]).optional(),
  by: AssessmentScalarFieldEnumSchema.array(),
  having: AssessmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AssessmentFindUniqueArgsSchema: z.ZodType<Prisma.AssessmentFindUniqueArgs> = z.object({
  select: AssessmentSelectSchema.optional(),
  include: AssessmentIncludeSchema.optional(),
  where: AssessmentWhereUniqueInputSchema,
}).strict()

export const AssessmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AssessmentFindUniqueOrThrowArgs> = z.object({
  select: AssessmentSelectSchema.optional(),
  include: AssessmentIncludeSchema.optional(),
  where: AssessmentWhereUniqueInputSchema,
}).strict()

export const AssessmentSessionFindFirstArgsSchema: z.ZodType<Prisma.AssessmentSessionFindFirstArgs> = z.object({
  select: AssessmentSessionSelectSchema.optional(),
  include: AssessmentSessionIncludeSchema.optional(),
  where: AssessmentSessionWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentSessionOrderByWithRelationInputSchema.array(),AssessmentSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: AssessmentSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AssessmentSessionScalarFieldEnumSchema,AssessmentSessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AssessmentSessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AssessmentSessionFindFirstOrThrowArgs> = z.object({
  select: AssessmentSessionSelectSchema.optional(),
  include: AssessmentSessionIncludeSchema.optional(),
  where: AssessmentSessionWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentSessionOrderByWithRelationInputSchema.array(),AssessmentSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: AssessmentSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AssessmentSessionScalarFieldEnumSchema,AssessmentSessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AssessmentSessionFindManyArgsSchema: z.ZodType<Prisma.AssessmentSessionFindManyArgs> = z.object({
  select: AssessmentSessionSelectSchema.optional(),
  include: AssessmentSessionIncludeSchema.optional(),
  where: AssessmentSessionWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentSessionOrderByWithRelationInputSchema.array(),AssessmentSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: AssessmentSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AssessmentSessionScalarFieldEnumSchema,AssessmentSessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AssessmentSessionAggregateArgsSchema: z.ZodType<Prisma.AssessmentSessionAggregateArgs> = z.object({
  where: AssessmentSessionWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentSessionOrderByWithRelationInputSchema.array(),AssessmentSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: AssessmentSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AssessmentSessionGroupByArgsSchema: z.ZodType<Prisma.AssessmentSessionGroupByArgs> = z.object({
  where: AssessmentSessionWhereInputSchema.optional(),
  orderBy: z.union([ AssessmentSessionOrderByWithAggregationInputSchema.array(),AssessmentSessionOrderByWithAggregationInputSchema ]).optional(),
  by: AssessmentSessionScalarFieldEnumSchema.array(),
  having: AssessmentSessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AssessmentSessionFindUniqueArgsSchema: z.ZodType<Prisma.AssessmentSessionFindUniqueArgs> = z.object({
  select: AssessmentSessionSelectSchema.optional(),
  include: AssessmentSessionIncludeSchema.optional(),
  where: AssessmentSessionWhereUniqueInputSchema,
}).strict()

export const AssessmentSessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AssessmentSessionFindUniqueOrThrowArgs> = z.object({
  select: AssessmentSessionSelectSchema.optional(),
  include: AssessmentSessionIncludeSchema.optional(),
  where: AssessmentSessionWhereUniqueInputSchema,
}).strict()

export const SubmissionFindFirstArgsSchema: z.ZodType<Prisma.SubmissionFindFirstArgs> = z.object({
  select: SubmissionSelectSchema.optional(),
  include: SubmissionIncludeSchema.optional(),
  where: SubmissionWhereInputSchema.optional(),
  orderBy: z.union([ SubmissionOrderByWithRelationInputSchema.array(),SubmissionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubmissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubmissionScalarFieldEnumSchema,SubmissionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SubmissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubmissionFindFirstOrThrowArgs> = z.object({
  select: SubmissionSelectSchema.optional(),
  include: SubmissionIncludeSchema.optional(),
  where: SubmissionWhereInputSchema.optional(),
  orderBy: z.union([ SubmissionOrderByWithRelationInputSchema.array(),SubmissionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubmissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubmissionScalarFieldEnumSchema,SubmissionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SubmissionFindManyArgsSchema: z.ZodType<Prisma.SubmissionFindManyArgs> = z.object({
  select: SubmissionSelectSchema.optional(),
  include: SubmissionIncludeSchema.optional(),
  where: SubmissionWhereInputSchema.optional(),
  orderBy: z.union([ SubmissionOrderByWithRelationInputSchema.array(),SubmissionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubmissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubmissionScalarFieldEnumSchema,SubmissionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SubmissionAggregateArgsSchema: z.ZodType<Prisma.SubmissionAggregateArgs> = z.object({
  where: SubmissionWhereInputSchema.optional(),
  orderBy: z.union([ SubmissionOrderByWithRelationInputSchema.array(),SubmissionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubmissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SubmissionGroupByArgsSchema: z.ZodType<Prisma.SubmissionGroupByArgs> = z.object({
  where: SubmissionWhereInputSchema.optional(),
  orderBy: z.union([ SubmissionOrderByWithAggregationInputSchema.array(),SubmissionOrderByWithAggregationInputSchema ]).optional(),
  by: SubmissionScalarFieldEnumSchema.array(),
  having: SubmissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SubmissionFindUniqueArgsSchema: z.ZodType<Prisma.SubmissionFindUniqueArgs> = z.object({
  select: SubmissionSelectSchema.optional(),
  include: SubmissionIncludeSchema.optional(),
  where: SubmissionWhereUniqueInputSchema,
}).strict()

export const SubmissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubmissionFindUniqueOrThrowArgs> = z.object({
  select: SubmissionSelectSchema.optional(),
  include: SubmissionIncludeSchema.optional(),
  where: SubmissionWhereUniqueInputSchema,
}).strict()

export const ContributionFindFirstArgsSchema: z.ZodType<Prisma.ContributionFindFirstArgs> = z.object({
  select: ContributionSelectSchema.optional(),
  include: ContributionIncludeSchema.optional(),
  where: ContributionWhereInputSchema.optional(),
  orderBy: z.union([ ContributionOrderByWithRelationInputSchema.array(),ContributionOrderByWithRelationInputSchema ]).optional(),
  cursor: ContributionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContributionScalarFieldEnumSchema,ContributionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ContributionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContributionFindFirstOrThrowArgs> = z.object({
  select: ContributionSelectSchema.optional(),
  include: ContributionIncludeSchema.optional(),
  where: ContributionWhereInputSchema.optional(),
  orderBy: z.union([ ContributionOrderByWithRelationInputSchema.array(),ContributionOrderByWithRelationInputSchema ]).optional(),
  cursor: ContributionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContributionScalarFieldEnumSchema,ContributionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ContributionFindManyArgsSchema: z.ZodType<Prisma.ContributionFindManyArgs> = z.object({
  select: ContributionSelectSchema.optional(),
  include: ContributionIncludeSchema.optional(),
  where: ContributionWhereInputSchema.optional(),
  orderBy: z.union([ ContributionOrderByWithRelationInputSchema.array(),ContributionOrderByWithRelationInputSchema ]).optional(),
  cursor: ContributionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContributionScalarFieldEnumSchema,ContributionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ContributionAggregateArgsSchema: z.ZodType<Prisma.ContributionAggregateArgs> = z.object({
  where: ContributionWhereInputSchema.optional(),
  orderBy: z.union([ ContributionOrderByWithRelationInputSchema.array(),ContributionOrderByWithRelationInputSchema ]).optional(),
  cursor: ContributionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContributionGroupByArgsSchema: z.ZodType<Prisma.ContributionGroupByArgs> = z.object({
  where: ContributionWhereInputSchema.optional(),
  orderBy: z.union([ ContributionOrderByWithAggregationInputSchema.array(),ContributionOrderByWithAggregationInputSchema ]).optional(),
  by: ContributionScalarFieldEnumSchema.array(),
  having: ContributionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContributionFindUniqueArgsSchema: z.ZodType<Prisma.ContributionFindUniqueArgs> = z.object({
  select: ContributionSelectSchema.optional(),
  include: ContributionIncludeSchema.optional(),
  where: ContributionWhereUniqueInputSchema,
}).strict()

export const ContributionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContributionFindUniqueOrThrowArgs> = z.object({
  select: ContributionSelectSchema.optional(),
  include: ContributionIncludeSchema.optional(),
  where: ContributionWhereUniqueInputSchema,
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const OrganizationCreateArgsSchema: z.ZodType<Prisma.OrganizationCreateArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  data: z.union([ OrganizationCreateInputSchema,OrganizationUncheckedCreateInputSchema ]),
}).strict()

export const OrganizationUpsertArgsSchema: z.ZodType<Prisma.OrganizationUpsertArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
  create: z.union([ OrganizationCreateInputSchema,OrganizationUncheckedCreateInputSchema ]),
  update: z.union([ OrganizationUpdateInputSchema,OrganizationUncheckedUpdateInputSchema ]),
}).strict()

export const OrganizationCreateManyArgsSchema: z.ZodType<Prisma.OrganizationCreateManyArgs> = z.object({
  data: z.union([ OrganizationCreateManyInputSchema,OrganizationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const OrganizationDeleteArgsSchema: z.ZodType<Prisma.OrganizationDeleteArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict()

export const OrganizationUpdateArgsSchema: z.ZodType<Prisma.OrganizationUpdateArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  data: z.union([ OrganizationUpdateInputSchema,OrganizationUncheckedUpdateInputSchema ]),
  where: OrganizationWhereUniqueInputSchema,
}).strict()

export const OrganizationUpdateManyArgsSchema: z.ZodType<Prisma.OrganizationUpdateManyArgs> = z.object({
  data: z.union([ OrganizationUpdateManyMutationInputSchema,OrganizationUncheckedUpdateManyInputSchema ]),
  where: OrganizationWhereInputSchema.optional(),
}).strict()

export const OrganizationDeleteManyArgsSchema: z.ZodType<Prisma.OrganizationDeleteManyArgs> = z.object({
  where: OrganizationWhereInputSchema.optional(),
}).strict()

export const MembershipCreateArgsSchema: z.ZodType<Prisma.MembershipCreateArgs> = z.object({
  select: MembershipSelectSchema.optional(),
  include: MembershipIncludeSchema.optional(),
  data: z.union([ MembershipCreateInputSchema,MembershipUncheckedCreateInputSchema ]),
}).strict()

export const MembershipUpsertArgsSchema: z.ZodType<Prisma.MembershipUpsertArgs> = z.object({
  select: MembershipSelectSchema.optional(),
  include: MembershipIncludeSchema.optional(),
  where: MembershipWhereUniqueInputSchema,
  create: z.union([ MembershipCreateInputSchema,MembershipUncheckedCreateInputSchema ]),
  update: z.union([ MembershipUpdateInputSchema,MembershipUncheckedUpdateInputSchema ]),
}).strict()

export const MembershipCreateManyArgsSchema: z.ZodType<Prisma.MembershipCreateManyArgs> = z.object({
  data: z.union([ MembershipCreateManyInputSchema,MembershipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const MembershipDeleteArgsSchema: z.ZodType<Prisma.MembershipDeleteArgs> = z.object({
  select: MembershipSelectSchema.optional(),
  include: MembershipIncludeSchema.optional(),
  where: MembershipWhereUniqueInputSchema,
}).strict()

export const MembershipUpdateArgsSchema: z.ZodType<Prisma.MembershipUpdateArgs> = z.object({
  select: MembershipSelectSchema.optional(),
  include: MembershipIncludeSchema.optional(),
  data: z.union([ MembershipUpdateInputSchema,MembershipUncheckedUpdateInputSchema ]),
  where: MembershipWhereUniqueInputSchema,
}).strict()

export const MembershipUpdateManyArgsSchema: z.ZodType<Prisma.MembershipUpdateManyArgs> = z.object({
  data: z.union([ MembershipUpdateManyMutationInputSchema,MembershipUncheckedUpdateManyInputSchema ]),
  where: MembershipWhereInputSchema.optional(),
}).strict()

export const MembershipDeleteManyArgsSchema: z.ZodType<Prisma.MembershipDeleteManyArgs> = z.object({
  where: MembershipWhereInputSchema.optional(),
}).strict()

export const CandidateCreateArgsSchema: z.ZodType<Prisma.CandidateCreateArgs> = z.object({
  select: CandidateSelectSchema.optional(),
  include: CandidateIncludeSchema.optional(),
  data: z.union([ CandidateCreateInputSchema,CandidateUncheckedCreateInputSchema ]),
}).strict()

export const CandidateUpsertArgsSchema: z.ZodType<Prisma.CandidateUpsertArgs> = z.object({
  select: CandidateSelectSchema.optional(),
  include: CandidateIncludeSchema.optional(),
  where: CandidateWhereUniqueInputSchema,
  create: z.union([ CandidateCreateInputSchema,CandidateUncheckedCreateInputSchema ]),
  update: z.union([ CandidateUpdateInputSchema,CandidateUncheckedUpdateInputSchema ]),
}).strict()

export const CandidateCreateManyArgsSchema: z.ZodType<Prisma.CandidateCreateManyArgs> = z.object({
  data: z.union([ CandidateCreateManyInputSchema,CandidateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CandidateDeleteArgsSchema: z.ZodType<Prisma.CandidateDeleteArgs> = z.object({
  select: CandidateSelectSchema.optional(),
  include: CandidateIncludeSchema.optional(),
  where: CandidateWhereUniqueInputSchema,
}).strict()

export const CandidateUpdateArgsSchema: z.ZodType<Prisma.CandidateUpdateArgs> = z.object({
  select: CandidateSelectSchema.optional(),
  include: CandidateIncludeSchema.optional(),
  data: z.union([ CandidateUpdateInputSchema,CandidateUncheckedUpdateInputSchema ]),
  where: CandidateWhereUniqueInputSchema,
}).strict()

export const CandidateUpdateManyArgsSchema: z.ZodType<Prisma.CandidateUpdateManyArgs> = z.object({
  data: z.union([ CandidateUpdateManyMutationInputSchema,CandidateUncheckedUpdateManyInputSchema ]),
  where: CandidateWhereInputSchema.optional(),
}).strict()

export const CandidateDeleteManyArgsSchema: z.ZodType<Prisma.CandidateDeleteManyArgs> = z.object({
  where: CandidateWhereInputSchema.optional(),
}).strict()

export const AssessmentCreateArgsSchema: z.ZodType<Prisma.AssessmentCreateArgs> = z.object({
  select: AssessmentSelectSchema.optional(),
  include: AssessmentIncludeSchema.optional(),
  data: z.union([ AssessmentCreateInputSchema,AssessmentUncheckedCreateInputSchema ]),
}).strict()

export const AssessmentUpsertArgsSchema: z.ZodType<Prisma.AssessmentUpsertArgs> = z.object({
  select: AssessmentSelectSchema.optional(),
  include: AssessmentIncludeSchema.optional(),
  where: AssessmentWhereUniqueInputSchema,
  create: z.union([ AssessmentCreateInputSchema,AssessmentUncheckedCreateInputSchema ]),
  update: z.union([ AssessmentUpdateInputSchema,AssessmentUncheckedUpdateInputSchema ]),
}).strict()

export const AssessmentCreateManyArgsSchema: z.ZodType<Prisma.AssessmentCreateManyArgs> = z.object({
  data: z.union([ AssessmentCreateManyInputSchema,AssessmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AssessmentDeleteArgsSchema: z.ZodType<Prisma.AssessmentDeleteArgs> = z.object({
  select: AssessmentSelectSchema.optional(),
  include: AssessmentIncludeSchema.optional(),
  where: AssessmentWhereUniqueInputSchema,
}).strict()

export const AssessmentUpdateArgsSchema: z.ZodType<Prisma.AssessmentUpdateArgs> = z.object({
  select: AssessmentSelectSchema.optional(),
  include: AssessmentIncludeSchema.optional(),
  data: z.union([ AssessmentUpdateInputSchema,AssessmentUncheckedUpdateInputSchema ]),
  where: AssessmentWhereUniqueInputSchema,
}).strict()

export const AssessmentUpdateManyArgsSchema: z.ZodType<Prisma.AssessmentUpdateManyArgs> = z.object({
  data: z.union([ AssessmentUpdateManyMutationInputSchema,AssessmentUncheckedUpdateManyInputSchema ]),
  where: AssessmentWhereInputSchema.optional(),
}).strict()

export const AssessmentDeleteManyArgsSchema: z.ZodType<Prisma.AssessmentDeleteManyArgs> = z.object({
  where: AssessmentWhereInputSchema.optional(),
}).strict()

export const AssessmentSessionCreateArgsSchema: z.ZodType<Prisma.AssessmentSessionCreateArgs> = z.object({
  select: AssessmentSessionSelectSchema.optional(),
  include: AssessmentSessionIncludeSchema.optional(),
  data: z.union([ AssessmentSessionCreateInputSchema,AssessmentSessionUncheckedCreateInputSchema ]),
}).strict()

export const AssessmentSessionUpsertArgsSchema: z.ZodType<Prisma.AssessmentSessionUpsertArgs> = z.object({
  select: AssessmentSessionSelectSchema.optional(),
  include: AssessmentSessionIncludeSchema.optional(),
  where: AssessmentSessionWhereUniqueInputSchema,
  create: z.union([ AssessmentSessionCreateInputSchema,AssessmentSessionUncheckedCreateInputSchema ]),
  update: z.union([ AssessmentSessionUpdateInputSchema,AssessmentSessionUncheckedUpdateInputSchema ]),
}).strict()

export const AssessmentSessionCreateManyArgsSchema: z.ZodType<Prisma.AssessmentSessionCreateManyArgs> = z.object({
  data: z.union([ AssessmentSessionCreateManyInputSchema,AssessmentSessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AssessmentSessionDeleteArgsSchema: z.ZodType<Prisma.AssessmentSessionDeleteArgs> = z.object({
  select: AssessmentSessionSelectSchema.optional(),
  include: AssessmentSessionIncludeSchema.optional(),
  where: AssessmentSessionWhereUniqueInputSchema,
}).strict()

export const AssessmentSessionUpdateArgsSchema: z.ZodType<Prisma.AssessmentSessionUpdateArgs> = z.object({
  select: AssessmentSessionSelectSchema.optional(),
  include: AssessmentSessionIncludeSchema.optional(),
  data: z.union([ AssessmentSessionUpdateInputSchema,AssessmentSessionUncheckedUpdateInputSchema ]),
  where: AssessmentSessionWhereUniqueInputSchema,
}).strict()

export const AssessmentSessionUpdateManyArgsSchema: z.ZodType<Prisma.AssessmentSessionUpdateManyArgs> = z.object({
  data: z.union([ AssessmentSessionUpdateManyMutationInputSchema,AssessmentSessionUncheckedUpdateManyInputSchema ]),
  where: AssessmentSessionWhereInputSchema.optional(),
}).strict()

export const AssessmentSessionDeleteManyArgsSchema: z.ZodType<Prisma.AssessmentSessionDeleteManyArgs> = z.object({
  where: AssessmentSessionWhereInputSchema.optional(),
}).strict()

export const SubmissionCreateArgsSchema: z.ZodType<Prisma.SubmissionCreateArgs> = z.object({
  select: SubmissionSelectSchema.optional(),
  include: SubmissionIncludeSchema.optional(),
  data: z.union([ SubmissionCreateInputSchema,SubmissionUncheckedCreateInputSchema ]),
}).strict()

export const SubmissionUpsertArgsSchema: z.ZodType<Prisma.SubmissionUpsertArgs> = z.object({
  select: SubmissionSelectSchema.optional(),
  include: SubmissionIncludeSchema.optional(),
  where: SubmissionWhereUniqueInputSchema,
  create: z.union([ SubmissionCreateInputSchema,SubmissionUncheckedCreateInputSchema ]),
  update: z.union([ SubmissionUpdateInputSchema,SubmissionUncheckedUpdateInputSchema ]),
}).strict()

export const SubmissionCreateManyArgsSchema: z.ZodType<Prisma.SubmissionCreateManyArgs> = z.object({
  data: z.union([ SubmissionCreateManyInputSchema,SubmissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SubmissionDeleteArgsSchema: z.ZodType<Prisma.SubmissionDeleteArgs> = z.object({
  select: SubmissionSelectSchema.optional(),
  include: SubmissionIncludeSchema.optional(),
  where: SubmissionWhereUniqueInputSchema,
}).strict()

export const SubmissionUpdateArgsSchema: z.ZodType<Prisma.SubmissionUpdateArgs> = z.object({
  select: SubmissionSelectSchema.optional(),
  include: SubmissionIncludeSchema.optional(),
  data: z.union([ SubmissionUpdateInputSchema,SubmissionUncheckedUpdateInputSchema ]),
  where: SubmissionWhereUniqueInputSchema,
}).strict()

export const SubmissionUpdateManyArgsSchema: z.ZodType<Prisma.SubmissionUpdateManyArgs> = z.object({
  data: z.union([ SubmissionUpdateManyMutationInputSchema,SubmissionUncheckedUpdateManyInputSchema ]),
  where: SubmissionWhereInputSchema.optional(),
}).strict()

export const SubmissionDeleteManyArgsSchema: z.ZodType<Prisma.SubmissionDeleteManyArgs> = z.object({
  where: SubmissionWhereInputSchema.optional(),
}).strict()

export const ContributionCreateArgsSchema: z.ZodType<Prisma.ContributionCreateArgs> = z.object({
  select: ContributionSelectSchema.optional(),
  include: ContributionIncludeSchema.optional(),
  data: z.union([ ContributionCreateInputSchema,ContributionUncheckedCreateInputSchema ]),
}).strict()

export const ContributionUpsertArgsSchema: z.ZodType<Prisma.ContributionUpsertArgs> = z.object({
  select: ContributionSelectSchema.optional(),
  include: ContributionIncludeSchema.optional(),
  where: ContributionWhereUniqueInputSchema,
  create: z.union([ ContributionCreateInputSchema,ContributionUncheckedCreateInputSchema ]),
  update: z.union([ ContributionUpdateInputSchema,ContributionUncheckedUpdateInputSchema ]),
}).strict()

export const ContributionCreateManyArgsSchema: z.ZodType<Prisma.ContributionCreateManyArgs> = z.object({
  data: z.union([ ContributionCreateManyInputSchema,ContributionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ContributionDeleteArgsSchema: z.ZodType<Prisma.ContributionDeleteArgs> = z.object({
  select: ContributionSelectSchema.optional(),
  include: ContributionIncludeSchema.optional(),
  where: ContributionWhereUniqueInputSchema,
}).strict()

export const ContributionUpdateArgsSchema: z.ZodType<Prisma.ContributionUpdateArgs> = z.object({
  select: ContributionSelectSchema.optional(),
  include: ContributionIncludeSchema.optional(),
  data: z.union([ ContributionUpdateInputSchema,ContributionUncheckedUpdateInputSchema ]),
  where: ContributionWhereUniqueInputSchema,
}).strict()

export const ContributionUpdateManyArgsSchema: z.ZodType<Prisma.ContributionUpdateManyArgs> = z.object({
  data: z.union([ ContributionUpdateManyMutationInputSchema,ContributionUncheckedUpdateManyInputSchema ]),
  where: ContributionWhereInputSchema.optional(),
}).strict()

export const ContributionDeleteManyArgsSchema: z.ZodType<Prisma.ContributionDeleteManyArgs> = z.object({
  where: ContributionWhereInputSchema.optional(),
}).strict()