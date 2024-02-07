/*
  Warnings:

  - A unique constraint covering the columns `[email,organization_id]` on the table `candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "candidate_id_email_organization_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "candidate_email_organization_id_key" ON "candidate"("email", "organization_id");
