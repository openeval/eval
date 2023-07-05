"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "~/lib/utils";


import { Button } from "~/components/ui/Button";

import { type Assessment } from "@prisma/client";

import {
  Form,
} from "~/components/ui/Form";
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
    <div className={cn("grid gap-6", className)}>
      {/* https://github.com/react-hook-form/react-hook-form/issues/10391 */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button isLoading={isLoading}>Next</Button>
        </form>
      </Form>
    </div>
  );
}
