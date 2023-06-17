"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "~/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "~/components/ui/Button";
import { type Assessment } from "@prisma/client";
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
import { useRouter } from "next/navigation";

import type { Prisma } from "@prisma/client";

const assessmentSchema = z.object({
  title: z.string(),
  description: z.string(),
});

interface AssessmentRoleFormProps extends React.HTMLAttributes<HTMLDivElement> {
  assessment: Partial<Assessment>;
  action: (data: FormData) => Promise<unknown>;
}

type FormData = z.infer<typeof assessmentSchema>;

export function RoleStageForm({
  className,
  ...props
}: AssessmentRoleFormProps) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(assessmentSchema),
    // @ts-expect-error react-hook-form issue
    values: props.assessment,
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    // @ts-expect-error canary issue
    startActionTransition(async () => {
      try {
        const assessment = await props.action(data);
        toast({
          title: "Success.",
          description: "Assessment created",
        });

        // router.refresh();
        router.push(`/assessments/add/${assessment.id}/tasks`);

        // router go to next step "tasks", i need the id :)
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
    <div className={cn("grid gap-6", className)} {...props}>
      {/* https://github.com/react-hook-form/react-hook-form/issues/10391 */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The role title..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <TextareaAutosize
                      minRows={5}
                      autoFocus
                      id="description"
                      placeholder="description"
                      className="w-full resize-none appearance-none overflow-hidden rounded-md border border-slate-300 bg-transparent py-2 px-3 focus:outline-none "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The job description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex ">
              <Button type="submit" isLoading={isLoading}>
                Next step
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
