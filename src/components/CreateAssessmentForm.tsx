"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import TextareaAutosize from "react-textarea-autosize";

import { Button } from "~/components/ui/Button";
import { type Assessment } from "@prisma/client";

interface CreateAssessmentFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  assessment: { title: string; description: string };
}

const assessmentSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type FormData = z.infer<typeof assessmentSchema>;

export function CreateAssessmentForm({
  className,
  ...props
}: CreateAssessmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(assessmentSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    // Mutate external data source
    const response = await fetch(`/api/assessments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setIsLoading(false);

    if (response.ok) {
      const assessment: Assessment = await response.json();
      router.refresh();
      router.push(`/assessments/${assessment.id}/issues`);
    } else {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <TextareaAutosize
              autoFocus
              id="title"
              // defaultValue={post.title}
              placeholder="Assessment title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              {...register("title")}
            />

            {/* <Input id="title" {...register("title")} /> */}
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <TextareaAutosize
              autoFocus
              id="description"
              // defaultValue={post.title}
              placeholder="description"
              className="prose w-full resize-none appearance-none overflow-hidden bg-transparent focus:outline-none"
              {...register("description")}
            />

            {errors?.description && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <Button type="submit" isLoading={isLoading}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
