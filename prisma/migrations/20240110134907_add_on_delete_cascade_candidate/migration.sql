-- DropForeignKey
ALTER TABLE "candidates_on_assessment" DROP CONSTRAINT "candidates_on_assessment_candidate_id_fkey";

-- AddForeignKey
ALTER TABLE "candidates_on_assessment" ADD CONSTRAINT "candidates_on_assessment_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
