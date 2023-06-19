"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { Button } from "~/components/ui/Button";

import { AssessmentStatus, type Assessment } from "@prisma/client";
import { Card } from "~/components/ui/Card";
import { Switch } from "~/components/ui/Switch";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Input } from "~/components/ui/Input";
import type { Prisma } from "@prisma/client";

interface AssessmentSettingsFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  assessment: Partial<Assessment>;
  action: (
    where: Prisma.AssessmentWhereUniqueInput,
    data: Prisma.AssessmentUpdateInput
  ) => Promise<unknown>;
}

const assessmentSchema = z.object({
  evaluationPeriod: z.string(),
  published: z.boolean(),
});

type FormData = z.infer<typeof assessmentSchema>;

export function AssessmentSettingsForm({
  className,
  ...props
}: AssessmentSettingsFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(assessmentSchema),
    // @ts-expect-error react-hook-form issue
    values: props.assessment,
  });
  const router = useRouter();

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    const payload = { ...data, status: AssessmentStatus.ACTIVE };

    // @ts-expect-error canary issue
    startActionTransition(async () => {
      try {
        await props.action({ id: props.assessment.id }, payload);
        toast({
          title: "Success.",
          description: "Assessment updated",
        });
        router.push(`/assessments/add/${props.assessment.id}/invite`);
      } catch (e) {
        // TODO: how to handle errors in with server actions
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
            <Card.Header>
              <Card.Title>Settings</Card.Title>
            </Card.Header>
            <Card.Content className="grid gap-4">
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
                name="evaluationPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Evaluation period</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ONE_DAY">1 day</SelectItem>
                        <SelectItem value="ONE_WEEK">1 week</SelectItem>
                        <SelectItem value="TWO_WEEK">2 weeks</SelectItem>
                        <SelectItem value="ONE_MONTH">1 month</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormDescription>
                      The interval to submit solutions.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </Card.Content>
            <Card.Footer>
              <Button type="submit" isLoading={isLoading}>
                Next Step
              </Button>
            </Card.Footer>
          </Card>
        </form>
      </Form>
    </div>
  );
}
