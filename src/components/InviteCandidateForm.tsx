"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import { type Assessment } from "@prisma/client";
import { Card } from "~/components/ui/Card";
import { Switch } from "~/components/ui/Switch";

interface InviteCandidateFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  assessment: { title: string; description: string };
  assessmentId?: string;
}

const assessmentSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

type FormData = z.infer<typeof assessmentSchema>;

export function InviteCandidateForm({
  assessmentId,
  className,
  onSubmit,
  ...props
}: InviteCandidateFormProps) {
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
    const response = await fetch(`/api/candidates/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assessmentId, ...data }),
    });

    setIsLoading(false);

    if (response.ok) {
      const assessment = await response.json();
      router.refresh();
      router.push(`/assessments`);
    } else {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    }
  }
  return (
    <div className={cn("mt-8 grid gap-6", className)}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <Card>
          <Card.Header>
            <Card.Title>Invite</Card.Title>
            {/* <Card.Description>
              Please enter your full name or a display name you are comfortable
              with.
            </Card.Description> */}
          </Card.Header>
          <Card.Content className="grid gap-4">
            <div className="grid gap-1">
              <Label className="" htmlFor="name">
                Name
              </Label>
              <Input id="name" {...register("name")} />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Label className="" htmlFor="name">
                Last name
              </Label>
              <Input id="lastName" {...register("lastName")} />
              {errors?.lastName && (
                <p className="px-1 text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Label className="" htmlFor="email">
                Email
              </Label>
              <Input id="email" {...register("email")} />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </Card.Content>
          <Card.Footer>
            <Button type="submit" isLoading={isLoading}>
              Invite
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </div>
  );
}
