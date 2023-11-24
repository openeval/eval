"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Assessment } from "@prisma/client";
import { AssessmentSchema } from "prisma/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

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
import type { UpdateAssessmentAction } from "./actions";

interface AssessmentSettingsFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  assessment: Partial<Assessment>;
  action: UpdateAssessmentAction;
  onSuccess?: () => void;
}

const assessmentSchema = AssessmentSchema.pick({
  published: true,
  evaluationPeriodDays: true,
});

type FormData = z.infer<typeof assessmentSchema>;

export function AssessmentSettingsForm({
  className,
  ...props
}: AssessmentSettingsFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(assessmentSchema),
    // @ts-expect-error prisma
    values: props.assessment,
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      const res = await props.action({ id: props.assessment.id }, data);
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
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
