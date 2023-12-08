"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Submission } from "@prisma/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
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
import type { EvaluationCriteriaWithChildren } from "~/server/repositories/EvaluationCriteria";
import type { SubmitReviewAction } from "../actions";

type ReviewSubmissionFormProps = {
  submission: Submission;
  onSuccess: () => void;
  evaluationCriterias: EvaluationCriteriaWithChildren;
  action: SubmitReviewAction;
};

const formSchema = z.object({
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
  evaluationCriterias,
  ...props
}: ReviewSubmissionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      evaluationCriterias: [],
    },
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      const res = await props.action(submission.id, data);
      if (res.success) {
        typeof props.onSuccess === "function" && props.onSuccess();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Review</CardTitle>
            <CardDescription>
              evaluate the performance of current submission
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="evaluationCriterias"
              render={() => (
                <FormItem className="space-y-4">
                  {evaluationCriterias.map((item) => {
                    return (
                      <div>
                        <div className="mb-4 flex">
                          <FormLabel className="text-base">
                            {item.name}
                          </FormLabel>
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
                                        checked={field.value?.includes(
                                          child.id,
                                        )}
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
          </CardContent>
          <CardFooter className="gap-x-4">
            <Button disabled={isLoading} variant={"default"}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
