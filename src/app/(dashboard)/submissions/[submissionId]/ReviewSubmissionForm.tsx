"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Prisma, type Submission } from "@prisma/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/Button";
import { Checkbox } from "~/components/ui/Checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Textarea } from "~/components/ui/Textarea";
import { toast } from "~/hooks/use-toast";
import type { EvaluationCriteriaWithChildren } from "~/server/services/EvaluationCriteria";
import type { SubmitReviewAction } from "../actions";

type ReviewWithEC = Prisma.ReviewGetPayload<{
  include: { evaluationCriterias };
}>;

type ReviewSubmissionFormProps = {
  submission: Submission;
  review?: ReviewWithEC;
  onSuccess: () => void;
  evaluationCriterias: EvaluationCriteriaWithChildren;
  action: SubmitReviewAction;
};

const formSchema = z.object({
  id: z.string().optional(),
  note: z.string(),
  evaluationCriterias: z
    .array(z.number())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

type FormData = z.infer<typeof formSchema>;

export function ReviewSubmissionForm({
  submission,
  review,
  evaluationCriterias,
  ...props
}: ReviewSubmissionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      evaluationCriterias: review?.evaluationCriterias.map((e) => e.id) || [],
      note: review?.note,
    },
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      if (review) {
        data = { ...data, id: review.id };
      }
      const res = await props.action(submission.id, data);
      if (res.success) {
        typeof props.onSuccess === "function" && props.onSuccess();
      } else {
        toast({
          title: "Something went wrong.",
          description: res.error?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="evaluationCriterias"
            render={() => (
              <FormItem className="space-y-4">
                {evaluationCriterias.map((item) => {
                  return (
                    <div>
                      <div className="mb-4 flex">
                        <FormLabel className="text-base">{item.name}</FormLabel>
                      </div>
                      <div className="space-y-2">
                        {item.children.map((child) => (
                          <FormField
                            key={child.id}
                            control={form.control}
                            name="evaluationCriterias"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={child.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(child.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              child.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== child.id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {child.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments and Feedback</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide specific comments and feedback on code, documentation, or any other relevant aspect. Be constructive and clear in your feedback."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This message is used internally
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4 flex rounded bg-muted p-4">
          <Button disabled={isLoading} variant={"default"} className="ml-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
