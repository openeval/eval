import { getCurrentUser } from "~/server/auth";
import { redirect } from "next/navigation";
import SearchIssuesBar from "~/components/SearchIssuesBar";
import { cache } from "react";

import { searchIssues } from "~/server/github";
import { Separator } from "~/components/ui/Separator";
import SaveAssessmentIssuesButton from "./SaveAssessmentIssuesButton";
import { updateAssessment } from "../../../actions";

const getIssues = cache(
  async (querySearch?: { [key: string]: string | string[] | undefined }) => {
    return await searchIssues({ querySearch: querySearch?.q });
  }
);

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

  // const issues = await getIssues(searchParams);
  return (
    <div>
      <div className="mb-8 flex justify-between px-2">
        <p className="text-neutral-500">tests for your candidates</p>
      </div>
      <SearchIssuesBar />
      <Separator className="my-4" />

      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        {/* {issues.map((item) => (
          <OpenTaskItem key={item.id} item={item} />
        ))} */}
      </div>

      <div className="mt-8 flex w-full">
        <SaveAssessmentIssuesButton
          action={updateAssessment}
          assessmentId={assessmentId}
        />
      </div>
    </div>
  );
}
