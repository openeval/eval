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
import { CreateAssessmentDto } from "~/dto/CreateAssessmentDto";

interface AssessmentRoleFormProps extends React.HTMLAttributes<HTMLDivElement> {
  assessment?: Partial<Assessment>;
  onSuccess?: () => void;
}

type FormData = z.infer<typeof CreateAssessmentDto>;

export function AssessmentRoleForm({
  className,
  ...props
}: AssessmentRoleFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(CreateAssessmentDto),
    values: props.assessment,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function create(formData: FormData) {
    "use server";

    console.log(formData);
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    React.startTransition(() => {
      await create(data);
    });
    // Mutate external data source
    const response = await fetch(`/api/assessments`, {
      method: props.assessment ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.assessment.id, ...data }),
    });

    setIsLoading(false);
    if (response.ok) {
      const assessment: Assessment = await response.json();
      if (props.onSuccess) {
        props.onSuccess();
      }
      router.refresh();
      if (!props.assessment) {
        router.push(`/assessments/${assessment.id}/issues`);
      }
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
                      // defaultValue={post.title}
                      placeholder="description"
                      className="h-[600px] w-full resize-none appearance-none overflow-hidden rounded-md border border-slate-300 bg-transparent py-2 px-3 focus:outline-none "
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
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
