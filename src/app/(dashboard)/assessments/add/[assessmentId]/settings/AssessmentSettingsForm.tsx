"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AssessmentStatus, type Assessment, type Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
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

interface AssessmentSettingsFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  assessment: Partial<Assessment>;
  action: (
    where: Prisma.AssessmentWhereUniqueInput,
    data: Prisma.AssessmentUpdateInput,
  ) => Promise<unknown>;
}

const assessmentSchema = z.object({
  evaluationPeriodDays: z.string(),
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
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="7">1 week</SelectItem>
                        <SelectItem value="14">2 weeks</SelectItem>
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
                Next Step
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
