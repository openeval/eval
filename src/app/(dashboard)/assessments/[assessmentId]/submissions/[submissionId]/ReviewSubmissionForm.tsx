"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type Prisma from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
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
  FormMessage,
} from "~/components/ui/Form";
import { Button } from "~/components/ui/Button";
import { Checkbox } from "~/components/ui/Checkbox";
import { z } from "zod";
import { Textarea } from "~/components/ui/Textarea";
import type { Submission } from "@prisma/client";
// import { Prisma } from "@prisma/client";

type EvaluationCriteriaWithChildren = Prisma.EvaluationCriteriaGetPayload<{
  include: { children: true };
}>;

type ReviewSubmissionFormProps = {
  submission: Partial<Submission>;
  onSuccess: () => void;
  evaluationCriterias: EvaluationCriteriaWithChildren[];
  action: (data: Partial<Prisma.EvaluationCriteria>) => Promise<unknown>;
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
      evaluationCriterias: [], //TODO: set this correctly
    },
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      try {
        await props.action(submission.id, data);
        props.onSuccess();
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
