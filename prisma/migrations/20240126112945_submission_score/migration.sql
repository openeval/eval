/*
  Warnings:

  - You are about to drop the column `totalScore` on the `review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "review" DROP COLUMN "totalScore",
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "submission" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;
