import { EqualNot } from "lucide-react";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { OpenTaskItem } from "~/components/OpenTaskItem";
import SearchIssuesBar from "~/components/SearchIssuesBar";
import { Separator } from "~/components/ui/Separator";
import { kIntFormat } from "~/lib/utils";
import { updateAssessmentAction } from "./actions";
import SaveAssessmentIssuesButton from "./SaveAssessmentIssuesButton";

export const AssessmentTaskPage = ({ data, flow }) => {
  const { total_count, issues, assessmentId } = data;
  return (
    <div>
      <div className="mb-8 flex justify-between">
        <p className="text-slate-500">
          Open source issues candidates could solve in the assessment
        </p>
      </div>

      <SearchIssuesBar />

      <Separator className="my-4" />

      {/* Preview issues  */}
      <div className="mb-2 flex justify-between">
        <div className="">Preview issues</div>
        <div className="text-sm font-semibold">
          {kIntFormat(total_count)} result{total_count > 1 && "s"}
        </div>
      </div>
      {issues && issues.length > 0 && (
        <div className="divide-y divide-slate-200 rounded-md border border-slate-200">
          {issues.map((item) => (
            <OpenTaskItem key={item.id} item={item} />
          ))}
        </div>
      )}

      {issues && issues?.length <= 0 && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={EqualNot} />
          <EmptyPlaceholder.Title> No tasks found</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Try with other filters or removing them
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
      <div className="mt-8 flex w-full">
        <SaveAssessmentIssuesButton
          action={updateAssessmentAction}
          assessmentId={assessmentId}
          flow={flow}
        />
      </div>
    </div>
  );
};
