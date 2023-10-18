"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Assessment, type Prisma } from "@prisma/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

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

interface AssessmentRoleFormProps extends React.HTMLAttributes<HTMLDivElement> {
  assessment: Partial<Assessment>;
  action: (
    where: Prisma.AssessmentWhereUniqueInput,
    data: Prisma.AssessmentUpdateInput,
  ) => Promise<unknown>;
}

const assessmentSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type FormData = z.infer<typeof assessmentSchema>;

export function AssessmentRoleForm({
  className,
  ...props
}: AssessmentRoleFormProps) {
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
        await props.action({ id: props.assessment.id }, data);
        toast({
          title: "Success.",
          description: "Assessment updated",
        });
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
                      autoFocus
                      id="description"
                      placeholder="description"
                      className="h-[600px] w-full resize-none appearance-none overflow-hidden rounded-md border border-slate-300 bg-transparent px-3 py-2 focus:outline-none "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The job description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex ">
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
