"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AssessmentSchema } from "prisma/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import type { z } from "zod";

import { Button } from "~/components/ui/Button";
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
import { toast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import type { CreateAssessmentAction } from "../actions";

const assessmentSchema = AssessmentSchema.pick({
  title: true,
  description: true,
});

interface AssessmentRoleFormProps extends React.HTMLAttributes<HTMLDivElement> {
  action: CreateAssessmentAction;
}

type FormData = z.infer<typeof assessmentSchema>;

export function RoleStageForm({
  className,
  ...props
}: AssessmentRoleFormProps) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(assessmentSchema),
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      const res = await props.action(data);
      if (res.success) {
        toast({
          title: "Success.",
          description: "Assessment created",
        });

        router.push(`/assessments/add/${res.data?.id}/tasks`);
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
    <div className={cn("grid gap-6", className)} {...props}>
      {/* https://github.com/react-hook-form/react-hook-form/issues/10391 */}
      <Form {...form}>
        <form id="assessment-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The role title..."
                      autoFocus
                      {...field}
                    />
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
                      id="description"
                      placeholder="description"
                      className="w-full resize-none appearance-none overflow-hidden rounded-md border border-slate-300 bg-transparent px-3 py-2 focus:outline-none "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The job description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex ">
              <Button
                type="submit"
                data-testid="confirmation-button"
                disabled={isLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
