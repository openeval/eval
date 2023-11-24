import { redirect } from "next/navigation";

import { getCurrentUser } from "~/server/auth";
import { searchIssues } from "~/server/github";
import { AssessmentTaskPage } from "../../../AssessmentTaskPage";

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

  const { items: issues, total_count } = await getIssues(searchParams);
  return (
    <AssessmentTaskPage
      data={{ issues, total_count, assessmentId }}
      flow="create"
    />
  );
}
