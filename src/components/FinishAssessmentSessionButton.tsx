"use client";
import { Button } from "~/components/ui/Button";
import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "~/hooks/use-toast";
import { type AssessmentSession } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/AlertDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import type { components } from "@octokit/openapi-types";

const formSchema = z.object({
  contributionId: z
    .number({
      required_error: "Please select an open source contribution.",
    })
    .min(1),
});

type FormValues = z.infer<typeof formSchema>;

interface FinishAssessmentSessionButtonProps {
  sessionId: string;
  contributions: components["schemas"]["issue-search-result-item"][];
  finishAssessmentSessionAction: (
    sessionId: string,
    contribution: components["schemas"]["issue-search-result-item"],
  ) => Promise<AssessmentSession>;
}

// add alert to start
export default function FinishAssessmentSessionButton({
  sessionId,
  contributions,
  finishAssessmentSessionAction,
}: FinishAssessmentSessionButtonProps) {
  const [isLoading, startActionTransition] = React.useTransition();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const onFinishSession = async (data) => {
    //given the current user
    // create an assessment session
    startActionTransition(async () => {
      try {
        const contribution = contributions.find(
          (item) => item.id === data.contributionId,
        );

        if (!contribution) {
          throw Error("contribution not found");
        }

        await finishAssessmentSessionAction(sessionId, contribution);

        // router.refresh();
        router.push(`/s/${sessionId}/confirmation`);
      } catch (e) {
        // TODO: how to handle errors in with server actions
        toast({
          title: "Something went wrong.",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Submit assessment</Button>
      </AlertDialogTrigger>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFinishSession)}
          className="space-y-8"
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to finish the assessment?
              </AlertDialogTitle>
            </AlertDialogHeader>

            <AlertDialogDescription>
              Pick one of your open source contributions to be evaluated. Once
              you submit your assessment you will not longer be able to change
              it. Good luck!
            </AlertDialogDescription>
            <FormField
              control={form.control}
              name="contributionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contribution</FormLabel>
                  <Select
                    type="number"
                    onValueChange={field.onChange}
                    // @ts-expect-error TODO: ts-error
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an open source contribution" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contributions.map((contribution) => (
                        <SelectItem
                          key={contribution.id}
                          // @ts-expect-error TODO: ts-error
                          value={contribution.id}
                        >
                          {contribution.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Please select a contribution to submit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                type="submit"
                onClick={form.handleSubmit(onFinishSession)}
                disabled={isLoading}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </Form>
    </AlertDialog>
  );
}
