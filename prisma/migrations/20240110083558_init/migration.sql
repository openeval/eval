-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('RECRUITER', 'CANDIDATE');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('MEMBER', 'REVIEWER', 'ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('PENDING', 'VERIFIED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CandidateOnAssessmentStatus" AS ENUM ('PENDING', 'ACCEPTED', 'STARTED', 'FINISHED', 'REJECTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "AssessmentStatus" AS ENUM ('DRAFT', 'ACTIVE', 'IN_PROGRESS', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'PROTECTED');

-- CreateEnum
CREATE TYPE "AssessmentSessionStatus" AS ENUM ('STARTED', 'FINISHED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('TO_REVIEW', 'REVIEWED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ContributionType" AS ENUM ('PULL_REQUEST', 'COMMENT', 'ISSUE');

-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('FEATURE', 'ISSUE');

-- CreateTable
CREATE TABLE "account" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "refresh_token_expires_in" INTEGER,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "password" TEXT,
    "onboarding_completed" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "ghUsername" TEXT,
    "type" "UserType",
    "active_org_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "organization" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT,
    "slug" TEXT,
    "logo" TEXT,
    "bio" TEXT,
    "size" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "role" "MembershipRole" NOT NULL,
    "organization_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "organization_id" UUID,
    "name" TEXT NOT NULL,
    "gh_username" TEXT,
    "status" "CandidateStatus" NOT NULL DEFAULT 'PENDING',
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates_on_assessment" (
    "assessment_id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "status" "CandidateOnAssessmentStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "candidates_on_assessment_pkey" PRIMARY KEY ("candidate_id","assessment_id")
);

-- CreateTable
CREATE TABLE "assessment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT NOT NULL,
    "status" "AssessmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_by_id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "gh_issues_query_seach" TEXT,
    "evaluation_period_days" TEXT DEFAULT '1',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC',

    CONSTRAINT "assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_session" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "expires_at" TIMESTAMP(3) NOT NULL,
    "status" "AssessmentSessionStatus" NOT NULL DEFAULT 'STARTED',
    "assessment_id" UUID NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),
    "candidate_id" UUID NOT NULL,

    CONSTRAINT "assessment_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "SubmissionStatus" NOT NULL DEFAULT 'TO_REVIEW',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidate_id" UUID NOT NULL,
    "assessment_session_id" UUID NOT NULL,
    "assessment_id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "note" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "submission_id" UUID NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contribution" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "ContributionType" NOT NULL DEFAULT 'PULL_REQUEST',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "state" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "meta" JSONB,
    "candidate_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submission_id" UUID NOT NULL,

    CONSTRAINT "contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,
    "assessment_id" UUID,

    CONSTRAINT "repo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation_criteria" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "parent_id" INTEGER,

    CONSTRAINT "evaluation_criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "type" "FeedbackType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userAssessmentReviewing" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_EvaluationCriteriaToReview" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_ghUsername_key" ON "user"("ghUsername");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "membership_user_id_organization_id_key" ON "membership"("user_id", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_user_id_key" ON "candidate"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_email_key" ON "candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_id_email_organization_id_key" ON "candidate"("id", "email", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "review_submission_id_key" ON "review"("submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "contribution_submission_id_key" ON "contribution"("submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "evaluation_criteria_name_key" ON "evaluation_criteria"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_userAssessmentReviewing_AB_unique" ON "_userAssessmentReviewing"("A", "B");

-- CreateIndex
CREATE INDEX "_userAssessmentReviewing_B_index" ON "_userAssessmentReviewing"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EvaluationCriteriaToReview_AB_unique" ON "_EvaluationCriteriaToReview"("A", "B");

-- CreateIndex
CREATE INDEX "_EvaluationCriteriaToReview_B_index" ON "_EvaluationCriteriaToReview"("B");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_active_org_id_fkey" FOREIGN KEY ("active_org_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates_on_assessment" ADD CONSTRAINT "candidates_on_assessment_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates_on_assessment" ADD CONSTRAINT "candidates_on_assessment_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_session" ADD CONSTRAINT "assessment_session_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_session" ADD CONSTRAINT "assessment_session_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_assessment_session_id_fkey" FOREIGN KEY ("assessment_session_id") REFERENCES "assessment_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repo" ADD CONSTRAINT "repo_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_criteria" ADD CONSTRAINT "evaluation_criteria_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "evaluation_criteria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userAssessmentReviewing" ADD CONSTRAINT "_userAssessmentReviewing_A_fkey" FOREIGN KEY ("A") REFERENCES "assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userAssessmentReviewing" ADD CONSTRAINT "_userAssessmentReviewing_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EvaluationCriteriaToReview" ADD CONSTRAINT "_EvaluationCriteriaToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "evaluation_criteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EvaluationCriteriaToReview" ADD CONSTRAINT "_EvaluationCriteriaToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
