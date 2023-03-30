import { getCurrentUser } from "~/server/auth";

type AssessmentDetailPageProps = {
  params: { assessmentId?: string };
};
export default async function AssessmentDetailPage({
  params,
}: AssessmentDetailPageProps) {
  const user = await getCurrentUser();
  return (
    <div>
      <h1>hello {user.email}</h1>
      details {params.assessmentId}
    </div>
  );
}
