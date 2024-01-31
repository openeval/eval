"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AssessmentSchema } from "prisma/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/Form";
import { MultiSelect } from "~/components/ui/MultiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { Switch } from "~/components/ui/Switch";
import { toast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import type { AssessmentItemData } from "~/server/services/Assessments";
import type { MembershipsByOrg } from "~/server/services/Membership";
import type { UpdateAssessmentAction } from "./actions";

interface AssessmentSettingsFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  assessment: NonNullable<Partial<AssessmentItemData>>;
  reviewees: MembershipsByOrg;
  action: UpdateAssessmentAction;
  onSuccess?: () => void;
}

const assessmentSchema = AssessmentSchema.pick({
  published: true,
  evaluationPeriodDays: true,
}).extend({
  reviewers: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

type FormData = z.infer<typeof assessmentSchema>;

export function AssessmentSettingsForm({
  className,
  ...props
}: AssessmentSettingsFormProps) {
  const defaultData = {
    ...props.assessment,
    reviewers: props.assessment?.reviewers?.map((i) => {
      return { value: i.id, label: i.name || i.email };
    }),
  };

  const form = useForm<FormData>({
    resolver: zodResolver(assessmentSchema),
    // @ts-expect-error prisma
    values: defaultData,
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    const payload = {
      ...data,
      reviewers: data.reviewers?.map((o) => ({ id: o.value })) || [],
    };

    // return;
    startActionTransition(async () => {
      const res = await props.action({ id: props.assessment.id }, payload);
      if (res.success) {
        toast({
          title: "Success.",
          description: "Assessment updated",
        });
        props.onSuccess && props.onSuccess();
      } else {
        toast({
          title: "Something went wrong.",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className={cn("grid gap-6", className)}>
      {/* https://github.com/react-hook-form/react-hook-form/issues/10391 */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Published</FormLabel>
                      <FormDescription>
                        Your assessment will be public available.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="evaluationPeriodDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Evaluation period</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as string | undefined}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"1"}>1 day</SelectItem>
                        <SelectItem value={"7"}>1 week</SelectItem>
                        <SelectItem value={"14"}>2 weeks</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormDescription>
                      The interval to submit solutions.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reviewers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reviewers</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value}
                        defaultOptions={props.reviewees.map((i) => {
                          return {
                            value: i.user.id,
                            label: i.user.name || i.user.email,
                          };
                        })}
                        emptyIndicator="no teammates left"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      The candidate submissions reviewers.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="ml-auto"
                data-testid="confirmation-button"
              >
                Save
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
