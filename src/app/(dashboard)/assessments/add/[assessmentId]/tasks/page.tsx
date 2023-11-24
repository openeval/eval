import { redirect } from "next/navigation";
import { cache } from "react";

import { OpenTaskItem } from "~/components/OpenTaskItem";
import SearchIssuesBar from "~/components/SearchIssuesBar";
import { Separator } from "~/components/ui/Separator";
import { getCurrentUser } from "~/server/auth";
import { searchIssues } from "~/server/github";
import { updateAssessmentAction } from "../../../actions";
import SaveAssessmentIssuesButton from "./SaveAssessmentIssuesButton";

const getIssues = cache(
  async (querySearch?: { [key: string]: string | string[] | undefined }) => {
    return await searchIssues({ querySearch: querySearch?.q });
  },
);

export const metadata = {
  title: "New Assessments - tasks",
};

export default async function TaskPage({
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

  const { items: issues } = await getIssues(searchParams);
  return (
    <div data-testid="tasks-page">
      <div className="mb-8 flex justify-between px-2">
        <p className="text-slate-500">
          Open source issues candidates could solve in the assessment
        </p>{" "}
      </div>
      <SearchIssuesBar />
      <Separator className="my-4" />

      <div className="divide-y divide-slate-200 rounded-md border border-slate-200">
        {issues.map((item) => (
          <OpenTaskItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 flex w-full">
        <SaveAssessmentIssuesButton
          action={updateAssessmentAction}
          assessmentId={assessmentId}
        />
      </div>
    </div>
  );
}
