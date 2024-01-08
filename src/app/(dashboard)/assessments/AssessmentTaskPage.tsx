import type { components } from "@octokit/openapi-types";
import { EqualNot } from "lucide-react";

import { EmptyPlaceholder } from "~/components/EmptyPlaceholder";
import { OpenTaskItem } from "~/components/OpenTaskItem";
import SearchIssuesBar from "~/components/SearchIssuesBar";
import { Separator } from "~/components/ui/Separator";
import { Typography } from "~/components/ui/Typography";
import { kIntFormat } from "~/lib/utils";
import { updateAssessmentAction } from "./actions";
import SaveAssessmentIssuesButton from "./SaveAssessmentIssuesButton";

type AssessmentTaskPageProps = {
  data: {
    issues: components["schemas"]["issue-search-result-item"][];
    total_count: number;
    assessmentId: string;
  };
  flow: "update" | "create";
};
export const AssessmentTaskPage = ({ data, flow }: AssessmentTaskPageProps) => {
  const { total_count, issues, assessmentId } = data;
  return (
    <div>
      <div className="mb-8 flex justify-between">
        <Typography variant={"muted"}>
          Open source issues candidates could solve in the assessment
        </Typography>
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
        <div className="divide-y divide-muted rounded-md border border-muted">
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
