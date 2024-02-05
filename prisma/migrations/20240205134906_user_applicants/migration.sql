/*
  Warnings:

  - You are about to drop the column `user_id` on the `candidate` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'APPLICANT';

-- DropForeignKey
ALTER TABLE "candidate" DROP CONSTRAINT "candidate_user_id_fkey";

-- DropIndex
DROP INDEX "candidate_user_id_key";

-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "user_id",
ADD COLUMN     "applicantId" UUID;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
