"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import { type Assessment } from "@prisma/client";
import { Card } from "~/components/ui/Card";
import { Switch } from "~/components/ui/Switch";

interface AssessmentSettingsFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  assessment: { title: string; description: string };
  assessmentId?: string;
}

const assessmentSchema = z.object({
  evaluationPeriod: z.string(),
  visibility: z.string(),
  published: z.boolean(),
});

type FormData = z.infer<typeof assessmentSchema>;

export function AssessmentSettingsForm({
  assessmentId,
  className,
  onSubmit,
  ...props
}: AssessmentSettingsFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(assessmentSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onHandleSubmit(data: FormData) {
    setIsLoading(true);
    // Mutate external data source
    const response = await fetch(`/api/assessments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: assessmentId, ...data }),
    });

    setIsLoading(false);

    if (response.ok) {
      const assessment = await response.json();
      router.refresh();
      router.push(`/assessments/${assessment.id}/candidates`);
    } else {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    }
  }
  console.log(errors);
  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <Card>
          <Card.Header>
            <Card.Title>Settings</Card.Title>
            {/* <Card.Description>
              Please enter your full name or a display name you are comfortable
              with.
            </Card.Description> */}
          </Card.Header>
          <Card.Content className="grid gap-4">
            <div className="grid gap-1">
              <div className="flex items-center space-x-2">
                <Controller
                  name="published"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      onCheckedChange={(value) =>
                        field.onChange(Boolean(value))
                      }
                      id="published"
                    />
                  )}
                />

                <Label htmlFor="published">Publish</Label>
              </div>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="visibility">Assessment access</Label>
              <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLIC">Public</SelectItem>
                      <SelectItem value="PRIVATE">Private</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.visibility && (
                <p className="px-1 text-xs text-red-600">
                  {errors.visibility.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="evaluationPeriod">Evaluation period</Label>
              <Controller
                name="evaluationPeriod"
                control={control}
                // defaultValue=""
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ONE_DAY">1 day</SelectItem>
                      <SelectItem value="ONE_WEEK">1 week</SelectItem>
                      <SelectItem value="TWO_WEEK">2 weeks</SelectItem>
                      <SelectItem value="ONE_MONTH">1 month</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.evaluationPeriod && (
                <p className="px-1 text-xs text-red-600">
                  {errors.evaluationPeriod.message}
                </p>
              )}
            </div>
          </Card.Content>
          <Card.Footer>
            <Button type="submit" isLoading={isLoading}>
              Next
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </div>
  );
}
