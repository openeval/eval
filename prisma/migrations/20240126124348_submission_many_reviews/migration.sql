/*
  Warnings:

  - You are about to drop the column `submission_id` on the `review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_submission_id_fkey";

-- DropIndex
DROP INDEX "review_submission_id_key";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "submission_id",
ADD COLUMN     "submissionId" UUID;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
