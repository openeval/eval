import { notFound, redirect } from "next/navigation";

import { getCurrentUser, isAuthorized } from "~/server/auth";
import { searchIssues } from "~/server/github";
import { findOneById } from "~/server/services/Assessments";
import { AssessmentTaskPage } from "../../AssessmentTaskPage";

const getIssues = async (querySearch?: {
  [key: string]: string | string[] | undefined;
}) => {
  return await searchIssues({ querySearch: querySearch?.q });
};

export const metadata = {
  title: "Assessments - tasks",
};

export default async function Page({
  params: { assessmentId },
  searchParams,
}: {
  params: { assessmentId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  if (!isAuthorized(user, "read", "Assessment")) {
    redirect("/404");
  }

  const assessment = await findOneById(assessmentId, user.activeOrgId);

  if (!assessment) {
    notFound();
  }

  const { items: issues, total_count } = await getIssues(searchParams);
  return (
    <AssessmentTaskPage
      data={{
        issues,
        total_count,
        assessmentId,
        ghIssuesQuerySeach: assessment.ghIssuesQuerySeach,
      }}
      flow="update"
    />
  );
}
