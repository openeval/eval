"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Prisma, type Submission } from "@prisma/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/Accordion";
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

  const onCategoryCheckChange = (checked, category) => {
    let checks = form.getValues("evaluationCriterias");

    const children = category.children.map((i) => i.id);

    checks = checked
      ? [...checks, ...children]
      : checks.filter((a) => !children?.includes(a));

    form.setValue("evaluationCriterias", checks);
  };

  const isCategoryChecked = (category) => {
    const checks = form.getValues("evaluationCriterias");

    return (
      category.children.filter((a) => checks.includes(a.id)).length ===
      category.children.length
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <Accordion type="single" collapsible className="w-full">
            <FormField
              control={form.control}
              name="evaluationCriterias"
              render={() => (
                <FormItem className="space-y-4">
                  {evaluationCriterias.map((item) => {
                    return (
                      <AccordionItem value={item.name}>
                        <div className="flex items-center">
                          <Checkbox
                            className="mr-2"
                            checked={isCategoryChecked(item)}
                            onCheckedChange={(checked) =>
                              onCategoryCheckChange(checked, item)
                            }
                          />

                          <AccordionTrigger className="">
                            <FormLabel className="flex w-full flex-row justify-between text-base">
                              {item.name}
                              <div className="mr-2 text-sm text-muted-foreground hover:no-underline">
                                {
                                  item.children.filter((a) =>
                                    form
                                      .getValues("evaluationCriterias")
                                      .includes(a.id),
                                  ).length
                                }
                                /{item.children.length}
                              </div>
                            </FormLabel>
                          </AccordionTrigger>
                        </div>
                        <AccordionContent>
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
                                            const value = checked
                                              ? [...field.value, child.id]
                                              : field.value?.filter(
                                                  (value) => value !== child.id,
                                                );

                                            field.onChange(value);
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
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                  <FormMessage />
                </FormItem>
              )}
            />
          </Accordion>
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
